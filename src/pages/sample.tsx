import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import { mainTheme } from '../themes';

interface Data {
  id: string;
  message: string;
}

const Title = styled.h1`
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  list-style-type: none;
  padding-inline-start: 0;
`;

const Item = styled.li`
  border-radius: 5px;
  border-color: ${(props) => props.theme.colors.primary};
  border-style: solid;
  color: ${(props) => props.theme.colors.primary};
  width: 60%;
  padding: 20px;
  margin: 10px;
  text-align: center;
`;

function Sample() {
  const [list, setList] = useState([]);

  const getList = useCallback(async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URI);
      setList(response.data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <ThemeProvider theme={mainTheme}>
      <section>
        <Title>GOGO BOARD 👾</Title>
        <List>
          {list.map((item: Data) => (
            <Item key={item.id}>{item.message}</Item>
          ))}
        </List>
      </section>
    </ThemeProvider>
  );
}

export default Sample;
