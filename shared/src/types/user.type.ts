// ========================================
// DATOS EN COMUN
// ========================================
export interface User {
  id: number;
  name: string;
  lastname?: string | null;
  username: string;
  profileImageUrl: string;
}

// ========================================
// DATOS COMPLETOS
// ========================================
// Frontend y Backend
export interface CompleteUser extends User {
  isPrivate: boolean;
  bio: string | "";

  stats: {
    contactsCount: number;
    postsCount: number;
  }

  createdAt: string;
}
