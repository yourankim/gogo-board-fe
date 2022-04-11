import Post from '../interface/post';
import { ListItem, ItemDescription } from '../components/style/post';
import { StyledLink } from '../components/style/common';

type postItemProps = { post: Post };

const PostItem = ({ post }: postItemProps) => {
  return (
    <ListItem>
      <StyledLink to={`/${post.id}`}>
        <h2>{post.title}</h2>
      </StyledLink>
      <ItemDescription>
        <span>by {post.user.name}</span>
        <span> - {new Date(post.created).toLocaleString()}</span>
      </ItemDescription>
    </ListItem>
  );
};

export default PostItem;
