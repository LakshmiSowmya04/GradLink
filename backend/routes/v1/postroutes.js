import { Router } from "express";
import { createPost, getPosts, likePost, unlikePost } from "../../controllers/postcontrollers.js";
const router = Router();

//create your routes here
//like router.get('/',controller); same to post,put and delete
router.post("/", createPost); // api/v1/post
router.get("/", getPosts); // api/v1/post
router.post("/like", likePost);
router.post("/unlike", unlikePost);

export default router;
