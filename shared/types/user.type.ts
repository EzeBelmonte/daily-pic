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
// DATOS DEL BASE DEL USUARIO
// ========================================
export interface UserBase extends User {
  isPrivate: boolean;
  bio: string | "";
  contactsCount: number;
  postsCount: number;
}

// ========================================
// USUARIO
// ========================================
export interface CompleteUser extends UserBase {
  createdAt: string;
}

// ========================================
// DATOS EDITABLES
// ========================================
export interface UpdateUser {
  //email: string;
  name?: string;
  lastname?: string | "";
  bio?: string | null;
  isPrivate?: boolean;
}
