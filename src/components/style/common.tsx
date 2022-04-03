import styled, { DefaultTheme } from 'styled-components';
import { Link } from 'react-router-dom';

type buttonProps = {
  theme: DefaultTheme;
  color: string;
  type?: string;
  [key: string]: any;
};

export const Button = styled.button.attrs((props) => ({
  type: props.type,
}))`
  border: 0;
  border-radius: 5px;
  height: 32px;
  min-width: 80px;
  background-color: ${(
    props: buttonProps // // TODO: typescript index signatures 알아보기
  ) => props.theme.colors[props.color || 'primary']};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  opacity: 1;

  &:hover {
    opacity: 0.6;
  }
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.black};
  text-decoration: none;
`;

const Message = styled.span`
  color: ${(props) => props.theme.colors.warn};
`;
