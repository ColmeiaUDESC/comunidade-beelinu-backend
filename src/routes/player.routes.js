import { Router } from "express";
import playerController from "../controllers/player.controller.js";
import inventoryController from "../controllers/inventoryController.js"

import playerMiddlewares from "../middlewares/global.middlewares.js";
const router = Router();

router.post("/", playerController.create);
router.get("/", playerController.findAll);
router.get(
  "/:id",
  playerMiddlewares.validPlayer,
  playerController.findById
);
router.get(
  "/:id/inventory",
  playerMiddlewares.validPlayer,
  inventoryController.findById,
)
router.patch(
  "/:id/inventory",
  playerMiddlewares.validPlayer,
  inventoryController.addItems,
)
router.delete(
  "/:id/inventory/:itemId",
  playerMiddlewares.validPlayer,
  inventoryController.removeItem,
)

export default router;
