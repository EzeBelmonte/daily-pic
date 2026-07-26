import { Readable } from "stream";

import cloudinary from "./cloudinary.js";

// ========================================
// SUBIR IMAGEN
// ========================================
export async function uploadImage(
  buffer: Buffer
): Promise<{
  imageUrl: string;
  imagePublicId: string;
}> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "posts",
      },
      (error, result) => {
        if (error || !result) {
          return reject(error);
        }

        resolve({
          imageUrl: result.secure_url,
          imagePublicId: result.public_id,
        });
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}

// ========================================
// ELIMINAR IMAGEN
// ========================================
export async function deleteImage(
  imagePublicId: string
): Promise<void> {
  const result = await cloudinary.uploader.destroy(imagePublicId);

  if (result.result !== "ok") {
    throw new Error("Error al eliminar la imagen");
  }
}