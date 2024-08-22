import { Router } from "express";
import serverController from "../controllers/server.controller.js";
import { adminAuthMiddleware } from "../middlewares/auth.middleware.js";
import { playerAuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", adminAuthMiddleware, serverController.create);
router.get("/:id", serverController.findById);
router.delete("/:id", adminAuthMiddleware, serverController.removeServer);
router.post("/temporary", playerAuthMiddleware, serverController.createTemporary)
router.get("/", serverController.findAll);
router.delete("/temporary/:id", playerAuthMiddleware, serverController.removeTemporary);
router.get("/temporary/:id", serverController.findTemporaryById);


export default router;
