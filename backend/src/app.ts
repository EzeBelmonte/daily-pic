import express, { type Express } from "express";
import cors from "cors";

// Rutas
import authRouter from "./modules/auth/auth.routes.js";
import usersRouter from "./modules/users/users.routes.js";
import contactsRouter from "./modules/contacts/contacts.routes.js";
import postsRouter from "./modules/posts/posts.routes.js";
import likesRouter from "./modules/likes/likes.routes.js";

const app: Express = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

// Rutas
app.use("/auth", authRouter);
app.use("/user", usersRouter);
app.use("/user", contactsRouter);
app.use("/posts", postsRouter);
app.use("/posts", likesRouter);

export default app;