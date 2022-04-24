import User from './user';

export default interface Post {
  id: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  updated: Date;
  user: User;
}
