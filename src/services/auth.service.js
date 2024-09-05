import { sql } from "../database/db.js";
import jwt from "jsonwebtoken";

const adminLoginService = (email) =>
  sql`SELECT * FROM admin WHERE email = ${email}`;

const playerLoginService = (email) =>
  sql`SELECT * FROM player WHERE email = ${email}`;

const generateToken = (id) =>
  jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });

export { adminLoginService, playerLoginService, generateToken };
