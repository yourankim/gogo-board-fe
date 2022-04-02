import { useState, useContext } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../themes';
import { useNavigate } from 'react-router-dom';
import {
  Title,
  LoginSection,
  LoginForm,
  Input,
  SubmitButton,
  Message,
} from '../components/style/login.style';
import User from '../interface/user';
import { UserContext } from '../context/user.context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  //userContext.setLoginState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault(); // TODO: 이거 없으니까 body가 query parameter로 넘어감..
    const loginUser: User = {
      email,
      password,
    };

    try {
      const response = await axiosInstance.post('/users/auth/', loginUser);
      const { user, accessToken } = response.data;
      console.log(user);
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;
      userContext.setUserState(user);
      userContext.setLoginState(true);
      navigate('/');
    } catch (e: any) {
      if (e.response.status === 401) {
        alert('계정 정보가 일치하지 않습니다.');
      } else {
        alert('일시적인 오류입니다. 잠시 후 다시 시도해주세요.');
      }
      console.error(e);
    }
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <LoginSection>
        <LoginForm onSubmit={handleSubmit}>
          <Title> GOGO BOARD 👾 </Title>
          <label htmlFor='email'>email</label>
          <Input
            name='email'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='password'>password</label>
          <Input
            name='password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SubmitButton>Log in</SubmitButton>
          <Message></Message>
        </LoginForm>
      </LoginSection>
    </ThemeProvider>
  );
};

export default Login;
