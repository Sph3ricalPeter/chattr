import { UserCredentials } from "./Auth";

export const env = import.meta.env;
const BASE_URL: string = `${env.VITE_SERVER_URL}:${env.VITE_API_PORT}`;

export const signIn = async (creds: UserCredentials) => {
  let userInfo = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  }).then((response) => {
    if (response.status !== 200) {
      console.log(response);
      throw new Error("Something went wrong");
    }
    return response;
  });
  return await userInfo.json();
};

export const signUp = async (creds: UserCredentials) => {
    let username = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    }).then((response) => {
      if (response.status !== 201) {
        console.log(response);
        throw new Error("Something went wrong");
      }
      return response;
    });
    return username;
};