import { Router } from "express";
import serverController from "../controllers/server.controller.js";

const router = Router();

router.post("/", serverController.create);
router.post("/temporary", serverController.createTemporary)
router.get("/", serverController.findAll);
router.delete("/temporary/:id", serverController.removeTemporary)


export default router;
