import { Router } from "express";
const router = Router();

import { adminLogin, playerLogin, temporaryAuth } from "../controllers/auth.controller.js";

router.post("/admin", adminLogin);
router.post("/player", playerLogin);
router.post("/temporary", temporaryAuth);

export default router;
