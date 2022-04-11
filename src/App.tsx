import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from './themes';
import Posts from './pages/posts';
import PostDetail from './pages/post.detail';
import SignUp from './pages/signup';
import Login from './pages/login';
import PostEditor from './pages/post.editor';
import { UserContext } from './context/user.context';
import PrivateRouter from './components/privateRouter';
import User from './interface/user';
import { refresh } from './api/axiosInstance';

const App = () => {
  const [user, setUser] = React.useState<User>({} as User);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true); // 이 값이 있어야 refresh 후 라우터가 다시 설정됨
  console.log('isLoggedIn in App', isLoggedIn);

  const userState = {
    user,
    isLoggedIn,
    setUserState: (user: User) => setUser(user),
    setLoginState: (isLoggedIn: boolean) => setIsLoggedIn(isLoggedIn),
  };

  const handleRefresh = async () => {
    try {
      const response = await refresh();
      if (!response) {
        return;
      }
      // TODO: 이러면 세번 연속 렌더링되는거야?
      const { user } = response.data;
      setUser(user);
      setIsLoggedIn(true);
    } catch (e: any) {
      console.log('refresh error', e);
      setUser({} as User);
      setIsLoggedIn(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname === '/login' || pathname === '/signup') {
      setLoading(false);
      return;
    }
    handleRefresh();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <UserContext.Provider value={userState}>
      <ThemeProvider theme={mainTheme}>
        <Router>
          <Routes>
            <Route element={<PrivateRouter isLoggedIn={isLoggedIn} />}>
              <Route path='/' element={<Posts />} />
              <Route path='/:postId' element={<PostDetail />} />
              <Route path='/write' element={<PostEditor />} />
              <Route path='/edit/:postId' element={<PostEditor />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
