import multer from "multer";

// Guardamos el archivo únicamente en memoria
const storage = multer.memoryStorage();

export const upload = multer({
  storage,

  // Tamaño máximo: 5 MB
  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  // Solo permitimos imágenes
  fileFilter(req, file, callback) {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(
        new Error("Solo se permiten imágenes JPG, PNG o WEBP")
      );
    }

    callback(null, true);
  },
});