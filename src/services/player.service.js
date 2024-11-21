import { sql } from "../database/db.js";

const create = (body) => sql`INSERT INTO player (player_id, username, email, password)
      VALUES (uuid_generate_v4(), ${body.username}, ${body.email}, ${body.password}) returning *
`;
const findAllService = () => sql`SELECT * FROM player`;
const findById = (id) => sql`SELECT * FROM player WHERE player_id = ${id}`;
const remove = (id) => sql`DELETE FROM player WHERE player_id = ${id}`

export default {
  create,
  findAllService,
  findById,
  remove,
};
