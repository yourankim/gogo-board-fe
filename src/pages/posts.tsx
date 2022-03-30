import React, { useCallback, useEffect } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import PostItem from '../components/post.item';
import Post from '../interface/post';

const Posts = () => {
  const [page, setPage] = React.useState<number>(0);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const getPosts = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/posts?page=${page}`);
      const prevPosts: Post[] = response.data.posts;
      setPosts([...posts, ...prevPosts]);
      setHasMore(prevPosts.length === 10);
    } catch (e: any) {
      console.log(e.Message);
    }
  }, [page]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            <PostItem post={post} />
          </li>
        ))}
      </ul>
      {hasMore && <button onClick={() => setPage(page + 1)}>더보기</button>}
    </>
  );
};

export default Posts;
