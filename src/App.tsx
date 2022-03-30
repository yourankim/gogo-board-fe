import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './posts/posts';
import PostDetail from './posts/post.detail';
import Register from './register/register';
import Login from './login/login';
import { UserContext } from './user.context';
import PrivateRouter from './privateRouter';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const loginState = {
    isLoggedIn: false,
    setLoginState: (isLoggedIn: boolean) => setIsLoggedIn(isLoggedIn),
  };
  console.log(isLoggedIn);

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
