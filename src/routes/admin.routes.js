import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import { adminAuthMiddleware } from "../middlewares/auth.middleware.js";
import playerMiddlewares from "../middlewares/global.middlewares.js";
const router = Router();

router.post("/", adminController.create);
router.delete("/:id", adminAuthMiddleware, adminController.removeAdmin);
router.get("/", adminController.findAll);
router.get(
  "/:id",
  playerMiddlewares.validAdmin,
  adminController.findById
);

export default router;
