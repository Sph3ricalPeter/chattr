import { UserCredentials } from "./Auth";

export const env = import.meta.env;
const BASE_URL: string = `${env.VITE_SERVER_URL}:${env.VITE_API_PORT}`;

export const signIn = async (creds: UserCredentials) => {
  let authresult = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error("Something went wrong");
    }
    return response;
  });
  return await authresult.json();
};

export const signUp = async (creds: UserCredentials) => {
    let signupresult = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    }).then((response) => {
      if (response.status !== 201) {
        throw new Error("Something went wrong");
      }
      return response;
    });
    return await signupresult.json();
};