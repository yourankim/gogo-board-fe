import Post from '../interface/post';

type postItemProps = { post: Post };

const PostItem = ({ post }: postItemProps) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.user.name}</p>
      <p>{new Date(post.created).toLocaleDateString()}</p>
      <p>{new Date(post.updated).toLocaleDateString()}</p>
    </div>
  );
};

export default PostItem;
