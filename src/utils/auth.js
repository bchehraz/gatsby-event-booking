import { isBrowser } from './helpers';

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
