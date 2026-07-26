import * as userRepository from "../../modules/users/users.repository.js";

export async function getExistingUserById(
  userId: number
) {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  return user;
}

export async function getExistingUserByUsername(
  username: string
) {
  const user = await userRepository.findUserByUsername(username);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  return user;
}