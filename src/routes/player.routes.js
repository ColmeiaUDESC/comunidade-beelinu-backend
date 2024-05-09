import { Router } from "express";
import playerController from "../controllers/player.controller.js";

import playerMiddlewares from "../middlewares/global.middlewares.js";
const router = Router();

router.post("/", playerController.create);
router.get("/", playerController.findAll);
router.get(
  "/:id",
  playerMiddlewares.validId,
  playerMiddlewares.validPlayer,
  playerController.findById
);

export default router;
