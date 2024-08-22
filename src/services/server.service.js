import { sql } from "../database/db.js";

const create = (
  server_name,
  server_ip,
  server_port
) => sql`INSERT INTO server (server_name, server_ip, server_port)
VALUES (${server_name}, ${server_ip}, ${server_port}) returning *
`;
const findById = (id) => sql`SELECT * FROM server WHERE server_id = ${id}`;
const findAll = () => sql`SELECT * FROM server`;
const remove = (id) => sql`DELETE FROM server WHERE server_id = ${id}`

export default { create, findAll, findById, remove };
