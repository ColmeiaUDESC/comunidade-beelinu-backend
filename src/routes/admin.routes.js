import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import { adminAuthMiddleware } from "../middlewares/auth.middleware.js";
import globalMiddlewares from "../middlewares/global.middlewares.js";
const router = Router();

router.post("/", adminAuthMiddleware, adminController.create);
router.delete("/:id", adminAuthMiddleware, adminController.removeAdmin);
router.get("/", adminAuthMiddleware, adminController.findAll);
router.get(
  "/:id",
  adminAuthMiddleware,
  globalMiddlewares.validAdmin,
  adminController.findById
);

adminController.initDefaultAdmin();

export default router;
