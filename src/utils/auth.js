// const isBrowser = typeof window !== `undefined`;
const isBrowser = true;

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

  const { token, userId, email } = getUser();
  if (!token) {
    return false;
  }
  return { token, userId, email };
}

export const onLoginSuccess = (token, userId, tokenExpiration, email) => {
  console.log(`Login Successful`);
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

  console.log(`Ensuring the \`user\` property exists.`);
  setUser({});
  callback();
}
