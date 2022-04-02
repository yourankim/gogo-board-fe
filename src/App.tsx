import React, { useEffect, useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './pages/posts';
import PostDetail from './pages/post.detail';
import SignUp from './pages/signup';
import Login from './pages/login';
import PostEditor from './pages/post.editor';
import { UserContext } from './context/user.context';
import PrivateRouter from './components/privateRouter';
import { axiosInstance } from './api/axiosInstance';
import User from './interface/user';

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

  const refresh = useCallback(async () => {
    try {
      console.log('refresh');
      const response = await axiosInstance.post('/users/auth/refresh/');
      const { user, accessToken } = response.data;
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;
      setUser(user);
      setIsLoggedIn(true);
    } catch (e: any) {
      console.log(e.Message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (loading) return <div>loading...</div>;

  return (
    <UserContext.Provider value={userState}>
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
    </UserContext.Provider>
  );
};

export default App;
