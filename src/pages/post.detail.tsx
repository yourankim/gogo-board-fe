import React, { useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Post from '../interface/post';
import { axiosInstance } from '../api/axiosInstance';
import { UserContext } from '../context/user.context';

const PostDetail = () => {
  const postId = useParams<{ postId: string }>().postId;
  const [post, setPost] = React.useState<Post>();

  const { user } = React.useContext(UserContext);

  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/posts/${postId}`);
      const post: Post = response.data.post;
      setPost(post);
    } catch (e: any) {
      console.log(e.Message);
    }
  }, [postId]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const handleDelete = () => {
    // TODO: 왜 alert은 되고 confirm은 안될까?
    window.confirm('정말 글을 삭제할까요?') && deletePost();
  };

  const deletePost = () => {
    try {
      axiosInstance.delete(`/posts/${postId}`);
      alert('글을 삭제했습니다.');
      navigate('/');
    } catch (e: any) {
      console.error(e.message);
    }
  };

  if (!post) return <div>loading...</div>; // TODO: loading 이미지 넣기, post id 유효하지 않을때 에러 처리(이건 서버에서 응답을 줘야할듯)
  // TODO: 수정,삭제, 글쓰기 본인이 작성한 글일때만 보이게
  return (
    <>
      <section>
        <h1>{post?.title}</h1>
        <div>
          <span>{post?.user.name}</span>
          <span>{new Date(post.created).toLocaleString()}</span>
          <span>{new Date(post.updated).toLocaleString()}</span>
        </div>
        <p>{post?.content}</p>
      </section>
      <div>
        {user && user.id === post.user.id && (
          <>
            <Link to={`/edit/${post.id}`}>
              <button>수정</button>
            </Link>
            <button onClick={handleDelete}>삭제</button>
          </>
        )}
        <button onClick={() => navigate('/')}>목록</button>
      </div>
    </>
  );
};

export default PostDetail;
