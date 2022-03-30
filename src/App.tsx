import React, { useEffect, useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './pages/posts';
import PostDetail from './pages/post.detail';
import Register from './pages/register';
import Login from './pages/login';
import { UserContext } from './context/user.context';
import PrivateRouter from './components/privateRouter';
import { axiosInstance } from './api/axiosInstance';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const loginState = {
    isLoggedIn: false,
    setLoginState: (isLoggedIn: boolean) => setIsLoggedIn(isLoggedIn),
  };
  console.log('isLoggedIn in App', isLoggedIn);

  const refresh = async () => {
    try {
      console.log('refresh');
      const response = await axiosInstance.post('/users/auth/refresh/');
      const accessToken = response.data;
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;
      setIsLoggedIn(true);
    } catch (e: any) {
      console.log(e.Message);
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <UserContext.Provider value={loginState}>
      <Router>
        <Routes>
          <Route element={<PrivateRouter isLoggedIn={isLoggedIn} />}>
            <Route path='/' element={<Posts />} />
            <Route path='/{postId}' element={<PostDetail />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
