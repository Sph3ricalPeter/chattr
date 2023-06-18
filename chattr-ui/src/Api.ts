import { AuthDto, CredentialsDto as CredentialsDto } from "./Auth";
import { MessageDto } from "./Chat";

export const env = import.meta.env;
const API_BASE_URL: string = `${env.VITE_SERVER_URL}:${env.VITE_API_PORT}`;

const capFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const handleResponse = async (response: any, ok: number): Promise<Response> => {
  if (response.status !== ok) {
    const err = await response.json();
    if (err.message instanceof Array) {
      throw new Error(err.message.map(capFirstLetter).concat().join('\n'));
    }
    throw new Error(capFirstLetter(err.message));
  }
  return response;
}

export const signIn = async (creds: CredentialsDto): Promise<AuthDto> => {
  return await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  }).then(async (response) => (await handleResponse(response, 200)).json());
};

export const signUp = async (creds: CredentialsDto): Promise<string> => {
  return await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  }).then(async (response) => (await handleResponse(response, 201)).text());
};

export const getMessages = async (): Promise<MessageDto[]> => {
  return await fetch(`${API_BASE_URL}/messages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => (await handleResponse(response, 200)).json());
};