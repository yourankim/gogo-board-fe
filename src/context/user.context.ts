import React from 'react';
import User from '../interface/user';

export const defaultUserState = {
  user: {} as User,
  isLoggedIn: false,
  setUserState: (user: User) => {},
  setLoginState: (isLoggedIn: boolean) => {},
};

export const UserContext = React.createContext(defaultUserState);
