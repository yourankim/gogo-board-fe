import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../api/axiosInstance';
import PostItem from '../components/post.item';
import Post from '../interface/post';

const Posts = () => {
  const [page, setPage] = React.useState<number>(0);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const getPosts = useCallback(async () => {
    const response = await axiosInstance.get(`/posts?page=${page}`);
    const prevPosts: Post[] = response.data.posts;
    setPosts([...posts, ...prevPosts]);
    setHasMore(prevPosts.length === 10);
  }, [page]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);
  //TODO: 상세 페이지 갔다가 돌아왔을 때 로딩했던 리스트 목록과 스크롤 위치가 유지되려면?
  return (
    <>
      <div>
        <Link to='/write'>
          <button>글쓰기</button>
        </Link>
      </div>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            <Link to={`/${post.id}`}>
              <PostItem post={post} />
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && <button onClick={() => setPage(page + 1)}>더보기</button>}
    </>
  );
};

export default Posts;
