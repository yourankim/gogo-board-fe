import Post from '../interface/post';

type postItemProps = { post: Post };

const PostItem = ({ post }: postItemProps) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.user.name}</p>
      <p>{new Date(post.created).toLocaleString()}</p>
    </div>
  );
};

export default PostItem;
