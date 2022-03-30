import React, { useCallback, useEffect } from 'react';
import { axiosInstance } from '../api/axiosInstance';

const Posts = () => {
  const [page, setPage] = React.useState(0);
  const [posts, setPosts] = React.useState([]);

  const getPosts = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/posts?page=${page}`);
      const { posts } = response.data;
      setPosts(posts);
    } catch (e: any) {
      console.log(e.Message);
    }
  }, [page]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return <h1>${posts.length}</h1>;
};

export default Posts;
