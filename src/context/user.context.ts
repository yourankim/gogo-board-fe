import React from 'react';

export const UserContext = React.createContext({
  isLoggedIn: false,
  setLoginState: (isLoggedIn: boolean) => {},
});
