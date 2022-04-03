import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
`;

const LoginSection = styled.section`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  width: 70%;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-shadow: 0 10px 20px rgb(0, 0, 0, 0.05), 0 20px 40px rgb(0, 0, 0, 0.05),
    0 1px 4px rgb(0, 0, 0, 0.15);

  label {
    font-weight: 600;
  }

  @media (min-width: 480px) {
    max-width: 280px;
  }
`;

const Input = styled.input.attrs((props) => ({
  type: props.type,
  name: props.name,
  required: props.required,
}))`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  height: 32px;
`;

const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
}))`
  margin: 10px 0;
  height: 32px;
`;

const Message = styled.span`
  color: ${(props) => props.theme.colors.warn};
`;

export { Title, LoginSection, LoginForm, Input, SubmitButton, Message };
