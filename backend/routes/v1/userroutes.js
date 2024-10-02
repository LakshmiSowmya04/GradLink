import { Router } from "express";
import {
  LoginUser,
  SignupUser,
  getUser,
  followUser,
} from "../../controllers/usercontrollers.js";
import authCheck from "../../middlewares/AuthCheck.js";
const router = Router();

//create your routes here
//like router.get('/',controller); same to post,put and delete
router.post("/signup", SignupUser); // api/v1/user/signup
router.post("/login", LoginUser); // api/v1/user/login
router.post("/follow/:userId", followUser); // api/v1/user/follow/:userId
router.get("/", authCheck, getUser); // api/v1/user

export default router;
