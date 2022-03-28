import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../themes';
import {
  Title,
  LoginSection,
  LoginForm,
  Input,
  SubmitButton,
  Message,
} from './login.style';

const Login = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <LoginSection>
        <LoginForm>
          <Title> GOGO BOARD 👾 </Title>
          <label htmlFor='email'>email</label>
          <Input name='email' type='email' required />
          <label htmlFor='password'>password</label>
          <Input name='password' type='password' required />
          <SubmitButton>Log in</SubmitButton>
          <Message></Message>
        </LoginForm>
      </LoginSection>
    </ThemeProvider>
  );
};

export default Login;
