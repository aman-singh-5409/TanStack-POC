export interface Comment {
  id: number;
  body: string;
  user: {
    fullName: string;
  };
  likes: number;
}

export interface CommentResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}
