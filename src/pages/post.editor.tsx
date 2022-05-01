import React, { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axiosInstance';
import Post from '../interface/post';
import { PostForm, Input, TextArea } from '../components/style/post';
import { Button } from '../components/style/common';
import { useForm, SubmitHandler } from 'react-hook-form';

function PostEditor() {
  const postId = useParams<{ postId: string }>().postId;
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  const navigate = useNavigate();
  //TODO: 중복 fetch 추출
  const getPost = useCallback(async () => {
    const response = await axiosInstance.get(`/posts/${postId}`);
    const post: Post = response.data.post;
    setValue('title', post.title);
    setValue('content', post.content);
    setIsLoading(false);
  }, [postId]);

  useEffect(() => {
    if (postId) {
      getPost();
    } else {
      setIsLoading(false);
    }
  }, [postId, getPost]);

  const onSubmit: SubmitHandler<Post> = async (formData) => {
    if (!window.confirm('글을 저장할까요?')) {
      return;
    }

    if (postId) {
      await axiosInstance.patch(`/posts`, formData);
    } else {
      await axiosInstance.post('/posts', formData);
    }
    alert('글을 저장했습니다.');
    navigate('/');
  };

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <PostForm onSubmit={handleSubmit(onSubmit)}>
      <h2>글쓰기</h2>
      {postId && (
        <Input type='hidden' {...register('id', { value: parseInt(postId) })} />
      )}
      <Input
        type='text'
        placeholder='제목을 입력하세요.'
        {...register('title', { required: true })}
      />
      <TextArea
        placeholder='내용을 입력하세요.'
        {...register('content', { required: true })}
      />
      <Button>저장</Button>
    </PostForm>
  );
}

export default PostEditor;
