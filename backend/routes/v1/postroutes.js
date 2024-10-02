import { Router } from "express";
import { createPost, getPosts } from "../../controllers/postcontrollers.js";
const router = Router();

//create your routes here
//like router.get('/',controller); same to post,put and delete
router.post("/", createPost); // api/v1/post
router.get("/", getPosts); // api/v1/post

export default router;
