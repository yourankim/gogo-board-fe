import { useContext } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../themes';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const onSubmit: SubmitHandler<User> = async (formData) => {
    try {
      const response = await axiosInstance.post('/users/auth/', formData);
      const { user } = response.data;
      userContext.setUserState(user);
      userContext.setLoginState(true);
      navigate('/');
    } catch (e: any) {
      if (e.response.status === 401) {
        alert('계정 정보가 일치하지 않습니다.');
      }
    }
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <LoginSection>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Title> GOGO BOARD 👾 </Title>
          <label htmlFor='email'>이메일</label>
          <Input type='email' {...register('email', { required: true })} />
          <Message>{errors.email && '이메일을 입력하세요.'}</Message>
          <label htmlFor='password'>비밀번호</label>
          <Input
            type='password'
            {...register('password', { required: true })}
          />
          <Message>{errors.password && '비밀번호를 입력하세요.'}</Message>
          <SubmitButton>Log in</SubmitButton>
        </LoginForm>
        <Link to='/signup'>회원가입</Link>
      </LoginSection>
    </ThemeProvider>
  );
};

export default Login;
