import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Rutas
import authRouter from "./modules/auth/auth.routes.js";
import usersRouter from "./modules/users/users.routes.js";
import contactsRouter from "./modules/contacts/contacts.routes.js";
import postsRouter from "./modules/posts/posts.routes.js";
import likesRouter from "./modules/likes/likes.routes.js";
import feedRouter from "./modules/feed/feed.routes.js";
import notificationsRouter from "./modules/notifications/notifications.routes.js";

// Error
import { errorMiddleware } from "./shared/middlewares/error.middleware.js";

const app: Express = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/contacts", contactsRouter);
app.use("/posts", postsRouter);
app.use("/posts", likesRouter);
app.use("/feed", feedRouter);
app.use("/notifications", notificationsRouter);

app.use(errorMiddleware);

export default app;