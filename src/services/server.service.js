import { sql } from "../database/db.js";

const create = (
  server_name,
  server_ip,
  server_port
) => sql`INSERT INTO server (server_name, server_ip, server_port)
VALUES (${server_name}, ${server_ip}, ${server_port}) returning *
`;

const findAll = () => sql`SELECT * FROM server`;

export default { create, findAll };
