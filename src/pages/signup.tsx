import { axiosInstance } from '../api/axiosInstance';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../themes';
import { useNavigate } from 'react-router-dom';
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

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<User> = async (formData) => {
    try {
      await axiosInstance.post('/users', formData);
      alert('가입되었습니다.');
      navigate('/login');
    } catch (e: any) {
      if (e.response.status === 409) {
        alert('이미 존재하는 이메일입니다.');
      }
    }
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <LoginSection>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Title> GOGO BOARD 가입 👾 </Title>
          <label htmlFor='email'>이메일</label>
          <Input type='email' {...register('email', { required: true })} />
          <Message>{errors.email && '이메일을 입력하세요.'}</Message>
          <label htmlFor='name'>이름</label>
          <Input {...register('name', { required: true })} />
          <Message>{errors.name && '이름을 입력하세요.'}</Message>
          <label htmlFor='password'>비밀번호</label>
          <Input
            type='password'
            {...register('password', { required: true })}
          />
          <Message>{errors.password && '비밀번호를 입력하세요.'}</Message>
          <SubmitButton>가입하기</SubmitButton>
        </LoginForm>
      </LoginSection>
    </ThemeProvider>
  );
};

export default SignUp;
