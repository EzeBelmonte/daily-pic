import * as userRepository from "./users.repository.js";
import * as postsServices from "../posts/posts.service.js";
import * as contactsServices from "../contacts/contacts.service.js";

import * as cloudinaryService from "../../infrastructure/cloudinary/cloudinary.service.js";

import type { UserUpdateSchema } from "@daily-pic/shared/schemas";

import type { CompleteUser } from "@daily-pic/shared/types";
import type { ImageItem } from "../../shared/types/uploadedImage.type.js";

import { toCompleteUserDTO } from "../../shared/mappers/user.mapper.js";

import { 
  getExistingUserById,
  getExistingUserByUsername
} from "../../shared/helpers/getExistingUser.js";

// ========================================
// MI USUARIO
// ========================================
export async function getMe(
  userId: number
): Promise<CompleteUser | null> {
  // Obtenemos el usuario
  const user = await getExistingUserById(userId);

  // Obtener cantidad de post
  const postsCount = await postsServices.countById(user.id);
  // Obtener cantidad de contacos
  const contactsCount = await contactsServices.countAccepted(user.id);

  return toCompleteUserDTO(
      user,
      contactsCount ?? 0,
      postsCount ?? 0,
  );
}

// ========================================
// ACTUALIZAR MI USUARIO
// ========================================
export async function updateMe(
  userId: number,
  imageBuffer: Buffer | undefined,
  data: UserUpdateSchema
) {
  // Obtenemos el usuario
  const user = await getExistingUserById(userId);

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

  await userRepository.update(userId, data, image);
}

// ========================================
// OBTENER USUARIO
// ========================================
export async function getUserByUsername(
  username: string
): Promise<CompleteUser | null> {
  // Obtenemos el usuario
  const user = await getExistingUserByUsername(username);

  await getExistingUserByUsername(username);
  
  // Obtener cantidad de post
  const postsCount = await postsServices.countById(user.id);
  // Obtener cantidad de contacos
  const contactsCount = await contactsServices.countAccepted(user.id);

  return toCompleteUserDTO(
      user,
      contactsCount ?? 0,
      postsCount ?? 0,
  );
}
