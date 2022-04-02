import React, { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axiosInstance';
import Post from '../interface/post';

function PostEditor() {
  const postId = useParams<{ postId: string }>().postId;
  const [post, setPost] = React.useState<Post>({} as Post);
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/posts/${postId}`);
      const post: Post = response.data.post;
      setPost(post);
      setTitle(post.title);
      setContent(post.content);
      setIsLoading(false);
    } catch (e: any) {
      console.log(e.Message);
    }
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
    try {
      //TODO: 등록/수정일 때 method가 다르지..
      if (postId) {
        await axiosInstance.patch(`/posts/${postId}`, newPost);
      } else {
        await axiosInstance.post('/posts', newPost);
      }
      alert('글을 저장했습니다.');
      navigate('/');
    } catch (e: any) {
      console.error(e.message);
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name='content'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button>저장</button>
    </form>
  );
}

export default PostEditor;
