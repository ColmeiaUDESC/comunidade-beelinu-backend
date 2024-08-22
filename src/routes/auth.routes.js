import { Router } from "express";
const router = Router();

import { adminLogin, playerLogin } from "../controllers/auth.controller.js";

router.post("/admin", adminLogin);
router.post("/player", playerLogin);

export default router;
