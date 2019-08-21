import React from 'react';

export default React.createContext({
  token: null,
  userId: null,
  email: null,
  // eslint-disable-next-line
  login: (token, userId, tokenExpiration) => {},
  logout: () => {},
});
