import { Router } from "express";
import pingController from "../controllers/ping.controller.js";

const router = Router();

router.get('/', pingController.ping);

export default router;
