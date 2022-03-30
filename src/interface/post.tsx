import User from './user';

export default interface Post {
  id: string;
  title: string;
  content: string;
  userName: string;
  created: Date;
  updated: Date;
  user: User;
}
