import { Router } from "express";
import chatRoutes from "./chatroutes.js";
import postRoutes from "./postroutes.js";
import userRoutes from "./userroutes.js";
const router = Router();
router.use("/chat", chatRoutes); // api/v1/chat
router.use("/post", postRoutes); // api/v1/post
router.use("/user", userRoutes); // api/v1/user

export default router;
