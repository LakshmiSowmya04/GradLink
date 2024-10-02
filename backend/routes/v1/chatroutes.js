import { Router } from "express";
import { getChats, sendMessage } from "../../controllers/chatcontrollers.js";
const router = Router();

//create your routes here
//like router.get('/',controller); same to post,put and delete
router.post("/", sendMessage); // api/v1/chat
router.get("/:userId", getChats); // api/v1/chat/:userId
export default router;
