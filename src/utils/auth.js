import { isBrowser, isResponseOk } from './helpers';

const getUser = () =>
  window.localStorage.user
    ? JSON.parse(window.localStorage.user)
    : {};

const setUser = user => {
  if (!isBrowser) return;
  window.localStorage.user = JSON.stringify(user);
}

export const getToken = () => {
  return getUser().token;
}

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const { token, userId, email } = getUser();
  if (!token) {
    return false;
  }
  return { token, userId, email };
}

export const onLoginSuccess = (token, userId, tokenExpiration, email) => {
  return setUser({
    token,
    userId,
    tokenExpiration,
    email
  });
}

export const getCurrentUser = () => isBrowser && getUser();

export const logout = callback => {
  if (!isBrowser) return;

  setUser({});
  callback();
}

const callAuthAPI = async (requestBody) => {
  return await fetch('https://graphql-event-booking.herokuapp.com/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export const login = async (email, password) => {
  if (!isBrowser) return false;

  const requestBody = {
    query: `
      query Login($email: String!, $password: String!) {
        login(
          email: $email,
          password: $password
        ) {
          userId
          token
          tokenExpiration
          email
        }
      }
    `,
    variables: {
      email, password
    }
  };

  try {
    const response = await callAuthAPI(requestBody);

    if (!isResponseOk(response)) {
      throw new Error("Login failed!");
    }

    const { data } = await response.json();

    if (!data.login) {
      return false;
    }

    return data.login;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const createNewAccount = async (email, password) => {
  const requestBody = {
    query: `
      mutation SignUp($email: String!, $password: String!) {
        createUser(userInput: {
          email: $email,
          password: $password
        }) {
          userId
          email
          token
          tokenExpiration
        }
      }
    `,
    variables: {
      email, password
    }
  };

  try {
    const response = await callAuthAPI(requestBody);

    if (!isResponseOk(response)) {
      throw new Error("Sign up failed!");
    }

    const { data } = await response.json();

    if (!data.createUser) {
      return false;
    }

    return data.createUser;
  } catch (e) {
    console.log(e);
    return false;
  }
}
