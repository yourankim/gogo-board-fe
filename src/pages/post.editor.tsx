import React, { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axiosInstance';
import Post from '../interface/post';
import {
  PostForm,
  PostTitle,
  PostContent,
  ItemDescription,
  Input,
  TextArea,
} from '../components/style/post';
import { Button } from '../components/style/common';

function PostEditor() {
  const postId = useParams<{ postId: string }>().postId;
  const [post, setPost] = React.useState<Post>({} as Post);
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const navigate = useNavigate();
  //TODO: 중복 fetch 추출, useForm 적용하기
  const getPost = useCallback(async () => {
    console.log('postEditor getPost');
    const response = await axiosInstance.get(`/posts/${postId}`);
    const post: Post = response.data.post;
    setPost(post);
    setTitle(post.title);
    setContent(post.content);
    setIsLoading(false);
  }, [postId]);

  useEffect(() => {
    if (postId) {
      getPost();
    } else {
      setIsLoading(false);
    }
  }, [postId, getPost]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    const newPost = { ...post, title, content };

    if (postId) {
      await axiosInstance.patch(`/posts`, newPost);
    } else {
      await axiosInstance.post('/posts', newPost);
    }
    alert('글을 저장했습니다.');
    navigate('/');
  };

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <PostForm onSubmit={handleSubmit}>
      <h2>글쓰기</h2>
      <Input
        type='text'
        name='title'
        value={title}
        placeholder='제목을 입력하세요.'
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        name='content'
        placeholder='내용을 입력하세요.'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button>저장</Button>
    </PostForm>
  );
}

export default PostEditor;
