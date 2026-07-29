import * as userRepository from "./users.repository.js";
import * as postsRepository from "../posts/posts.repository.js";

import * as cloudinaryService from "../../infrastructure/cloudinary/cloudinary.service.js";

import type { UpdateMe } from "@shared/index.js";
import type { ImageItem } from "../../shared/types/uploadedImage.type.js";

import { toUserDTO, toCompleteUserDTO } from "../../shared/mappers/user.mapper.js";

import { 
  getExistingUserByUsername 
} from "../../shared/helpers/getExistingUser.js";

// ========================================
// OBTENER MIS DATOS
// ========================================
export async function getMe(userId: number) {

  // Obtenemos el usuario
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  // Obtener cantidad de post
  const postsCount = await postsRepository.countPost(user.id);

  // Obtener cantidad de contactos
  const contactsCount = 0;

  return toCompleteUserDTO(
      user,
      contactsCount ?? 0,
      postsCount ?? 0,
  );
  
}

// ========================================
// ACTUALIZAR PERFIL
// ========================================
export async function updateMe(
  userId: number,
  imageBuffer: Buffer | undefined,
  data: UpdateMe
) {

  // Obtenemos el usuario
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  let image: ImageItem | undefined;

  if (imageBuffer) {
    // Si el ID es igual a "", significa que tiene la imagen de perfil por defecto
    // Si no, va a tener el id de la imagen que subio la vez anterior
    if (user.profileImagePublicId !== "") {
      await cloudinaryService.deleteImage(user.profileImagePublicId);
    }

    // Subimos la nueva imagen de perfil
    image = await cloudinaryService.uploadImage(imageBuffer);
  }

  const updateProfile = await userRepository.update(userId, data, image);

  return updateProfile;
}


// ========================================
// OBTENER PERFIL DE USUARIO
// ========================================
export async function getUserByUsername(username: string) {
  // Obtenemos el usuario
  const user = await userRepository.findUserByUsername(username);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  const targetUser = await getExistingUserByUsername(username);
  
    if (!targetUser) {
      throw new Error("El usuario no existe");
    }
  
    // Obtener cantidad de post
    const postsCount = await postsRepository.countPost(user.id);

    // Obtener cantidad de contactos
    const contactsCount = 0;

  return toCompleteUserDTO(
      user,
      contactsCount ?? 0,
      postsCount ?? 0,
  );
  
}
