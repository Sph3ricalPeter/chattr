import { UserCredentials } from "./Auth";

export const signIn = async (creds: UserCredentials) => {
  let authresult = await fetch('http://localhost:4000/auth/login', {
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
    let signupresult = await fetch('http://localhost:4000/auth/register', {
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