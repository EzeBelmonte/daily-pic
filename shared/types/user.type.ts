// ========================================
// DATOS EN COMUN
// ========================================
export interface User {
  id: number;
  name: string;
  lastname?: string | "";
  username: string;
  profileImageUrl: string;
}

// ========================================
// USUARIO
// ========================================
export interface CompleteUser extends User {
  isPrivate: boolean;
  bio: string | "";

  stats: {
    contactsCount: number;
    postsCount: number;
  }

  createdAt: string;
}

// ========================================
// DATOS EDITABLES
// ========================================
export interface UpdateMe {
  //email: string;
  name?: string;
  lastname?: string | "";
  bio?: string | null;
  isPrivate?: boolean;
}
