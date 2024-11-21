import { sql } from "../database/db.js";

const create = (body) => sql`INSERT INTO admin (admin_id, username, email, password)
      VALUES (uuid_generate_v4(), ${body.username}, ${body.email}, ${body.password}) returning *
`;
const findAllService = () => sql`SELECT * FROM admin`;
const findById = (id) => sql`SELECT * FROM admin WHERE admin_id = ${id}`;
const findByUsername = (name) => sql`SELECT * FROM admin WHERE username = ${name}`
const remove = (id) => sql`DELETE FROM admin WHERE admin_id = ${id}`;

export default {
  create,
  findAllService,
  findById,
  remove,
  findByUsername,
};
