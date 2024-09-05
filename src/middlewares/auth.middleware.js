import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import adminService from "../services/admin.service.js";
import playerService from "../services/player.service.js";
dotenv.config();

export const adminAuthMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.sendStatus(401);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.sendStatus(401);
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.send(401);
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token invlaid" });
      }
      const admin = await adminService.findById(decoded.id);
      if (admin.length == 0) {
        return res.status(401).send({ message: "Token invlaid" });
      }

      req.id = admin[0].admin_id;
      req.admin = admin;
      return next();
    });
  } catch (err) {
    res.status(500).sendStatus({ message: "a" });
  }
};

export const playerAuthMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(401);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.sendStatus(401);
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.send(401);
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token invlaid" });
      }
      const player = await playerService.findById(decoded.id);

      if (player.length == 0) {
        return res.status(401).send({ message: "Token invlaid" });
      }
      req.id = player[0].player_id;
      req.player = player;
      return next();
    });
  } catch (err) {
    res.status(500).sendStatus({ message: err.message });
  }
};
