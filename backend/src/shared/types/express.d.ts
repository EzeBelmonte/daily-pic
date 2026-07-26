// Para permitir que Typescript reconozaca: req.user
import "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: number;
      };
    }
  }
}

export {};