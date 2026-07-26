export interface CreatePost {
  description?: string;
}

export interface Post extends CreatePost {
  imageUrl: string;
  imagePublicId: string;
  id: number;
  createdAt: string;
}

export interface UpdatePost extends CreatePost {}