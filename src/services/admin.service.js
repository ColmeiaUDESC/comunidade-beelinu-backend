import { sql } from "../database/db.js";

const create = (body) => sql`INSERT INTO admin (username, email, password)
      VALUES (${body.username}, ${body.email}, ${body.password}) returning *
`;
const findAllService = () => sql`SELECT * FROM admin`;
const findById = (id) => sql`SELECT * FROM admin WHERE admin_id = ${id}`;
const remove = (id) => sql`DELETE FROM admin WHERE admin_id = ${id}`;

export default {
  create,
  findAllService,
  findById,
  remove,
};
