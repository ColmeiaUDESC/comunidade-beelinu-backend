import { sql } from "../database/db.js";

const create = (player_id) =>
  sql`INSERT INTO inventory (player_id) VALUES (${player_id}) returning *`;
const addItem = (player_id, id_items) =>
  sql`UPDATE inventory SET id_items = array_cat(id_items, ${id_items}) WHERE player_id = ${player_id} returning *`;
const findById = (id) => sql`SELECT * FROM inventory WHERE player_id = ${id}`;
const removeItem = (player_id, item_id) =>
  sql`UPDATE inventory SET id_items = array_remove(id_items, ${item_id}) WHERE player_id = ${player_id} returning *`;
const remove = (id) => sql`DELETE FROM inventory WHERE inventory_id = ${id}`;

export default { create, findById, addItem, removeItem, remove };
