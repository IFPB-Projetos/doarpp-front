import { User } from "./User";

export type Comment = {
    id: string;
    user: User;
    userId: string;
    postId: string;
    content: string;
    createdAt: Date;
  };