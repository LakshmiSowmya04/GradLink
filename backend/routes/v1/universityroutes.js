import { Router } from "express";
import { CreateUniversity } from "../../controllers/university.controllers.js";
import authCheck from "../../middlewares/AuthCheck.js";
import validateSchema from "../../middlewares/UserValidator.js";
import { createUniversity } from "../../lib/schema/universitySchema.js";

const router = Router();

router.post("/createUniversity", authCheck, validateSchema(createUniversity), CreateUniversity);

export default router;
