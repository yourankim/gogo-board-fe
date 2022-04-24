import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../api/axiosInstance';
import PostItem from '../components/post.item';
import Post from '../interface/post';
import { ListHeader, PostList, PostSection } from '../components/style/post';
import { Button } from '../components/style/common';

const Posts = () => {
  const [page, setPage] = React.useState<number>(0);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const getPosts = useCallback(async () => {
    const startAt = posts.length > 0 ? posts[posts.length - 1].id : 0;
    console.log(startAt);
    const response = await axiosInstance.get(
      `/posts?page=${page}&startAt=${startAt}`
    );
    const prevPosts: Post[] = response.data.posts;
    setPosts([...posts, ...prevPosts]);
    setHasMore(prevPosts.length === 10);
  }, [page]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);
  //TODO: 상세 페이지 갔다가 돌아왔을 때 로딩했던 리스트 목록과 스크롤 위치가 유지되려면?
  return (
    <PostSection>
      <ListHeader>
        <Link to='/write'>
          <Button>글쓰기</Button>
        </Link>
      </ListHeader>
      <PostList>
        {posts.map((post: Post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </PostList>
      {hasMore && (
        <Button color='secondary' onClick={() => setPage(page + 1)}>
          더보기
        </Button>
      )}
    </PostSection>
  );
};

export default Posts;
