export interface PostBase {
  description?: string;
}

// Frontend y Backend
export interface CreatePost extends PostBase {}
// Frontend y Backend
export interface UpdatePost extends PostBase {}

// Frontend y Backend
export interface Post extends PostBase { // b
  id: number;
  imageUrl: string;
  imagePublicId: string;
  createdAt: string;
}

// Frontend y Backend
export interface PostResponse extends Post {
  user: {
    id: number;
    username: string;
  };
}