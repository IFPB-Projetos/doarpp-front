import { User } from "./User";

export type TypeComment = {
    id: string;
    user: User;
    userId: string;
    postId: string;
    content: string;
    createdAt: Date;
  };