export interface PostBase {
  description?: string;
}

export interface CreatePost extends PostBase {}
export interface UpdatePost extends PostBase {}

export interface Post extends PostBase {
  id: number;
  imageUrl: string;
  imagePublicId: string;
  createdAt: string;
}

export interface PostResponse extends Post {
  user: {
    id: number;
    username: string;
  };
}