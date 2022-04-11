import styled from 'styled-components';

// TODO: 컴포넌트 상속 https://styled-components.com/docs/basics#extending-styles
export const PostSection = styled.section`
  width: 70%;
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10% 0;
  color: ${(props) => props.theme.colors.black};
`;

export const ListHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;

export const PostList = styled.ul`
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  list-style: none;
  padding-left: 0;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 0.9rem;
  &:first-child {
    border-top: 0;
  }
`;

export const ItemDescription = styled.div`
  display: flex;
  align-content: space-between;
  gap: 0.5rem;
  width: 100%;
  opacity: 0.6;
`;

export const PostArticle = styled.article`
  width: 70%;
  margin: 5%;
`;

export const PostTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

export const PostButtons = styled.div`
  display: flex;
  justify-content: right;
  gap: 0.5rem;
`;

export const PostContent = styled.pre`
  border-radius: 10px;
  font-size: 1.2rem;
  min-height: 50vh;
`;

export const PostForm = styled.form`
  width: 70%;
  height: 100vh;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-weight: 600;
  }
`;

export const Input = styled.input.attrs((props) => ({
  type: props.type,
  name: props.name,
  required: props.required,
}))`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  height: 32px;
`;

export const TextArea = styled.textarea.attrs((props) => ({
  name: props.name,
}))`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  min-height: 50vh;
`;
