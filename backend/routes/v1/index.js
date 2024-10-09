import { Router } from "express";
import chatRoutes from "./chatroutes.js";
import postRoutes from "./postroutes.js";
import userRoutes from "./userroutes.js";
import universityRoutes from "./universityroutes.js";
const router = Router();
router.use("/chat", chatRoutes); // api/v1/chat
router.use("/post", postRoutes); // api/v1/post
router.use("/user", userRoutes); // api/v1/user
router.use("/university", universityRoutes);

export default router;
