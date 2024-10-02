import { Router } from "express";
import v1Routes from "./v1/index.js";
const router = Router();
router.use("/v1", v1Routes); // /api/v1
export default router;
