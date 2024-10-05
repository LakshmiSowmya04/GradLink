import { Router } from "express";
import {
  LoginUser,
  SignupUser,
  getUser,
  followUser,
  verifyEmail,
} from "../../controllers/usercontrollers.js";
import authCheck from "../../middlewares/AuthCheck.js";
import validateSchema from "../../middlewares/UserValidator.js";
import { signUpSchema, logInSchema } from "../../lib/schema/userSchema.js";
const router = Router();

//create your routes here
//like router.get('/',controller); same to post,put and delete
router.post("/signup", validateSchema(signUpSchema),SignupUser); // api/v1/user/signup
router.post("/login", validateSchema(logInSchema), LoginUser); // api/v1/user/login
router.post("/follow/:userId", followUser); // api/v1/user/follow/:userId
router.post("/verify", authCheck, verifyEmail);
router.get("/", authCheck, getUser); // api/v1/user

export default router;
