import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from "../services/player.service.js";
dotenv.config();

export const authMiddleware = (req, res, next) => {
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
      const user = await userService.findById(decoded.id);

      if (!user || !user.id) {
        return res.status(401).send({ message: "Token invlaid" });
      }

      req.userId = user._id;
      return next();
    });
  } catch (err) {
    res.status(500).sendStatus({ message: err.message });
  }
};
