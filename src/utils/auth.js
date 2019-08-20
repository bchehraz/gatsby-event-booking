const isBrowser = typeof window !== `undefined`;

const getUser = () =>
  window.localStorage.user
    ? JSON.parse(window.localStorage.user)
    : {};

const setUser = user => {
  window.localStorage.user = JSON.stringify(user);
}

export const getToken = () => {
  return getUser().token;
}

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const { token, userId } = getUser();
  if (!token) {
    return false;
  }
  return { token, userId };
}

export const onLoginSuccess = (token, userId, tokenExpiration) => {
  console.log(`Login Successful`);
  return setUser({
    token,
    userId,
    tokenExpiration
  });
}

export const getCurrentUser = () => isBrowser && getUser();

export const logout = callback => {
  if (!isBrowser) return;

  console.log(`Ensuring the \`user\` property exists.`);
  setUser({});
  callback();
}
