DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS player;

CREATE TABLE player (
  player_id  SERIAL PRIMARY KEY,
  username text UNIQUE NOT NULL,
  email text NOT NULL,
  password text NOT NULL
);

CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    player_id integer,
    id_items integer ARRAY,
    CONSTRAINT fk_inventory
        FOREIGN KEY(player_id)
            REFERENCES player(player_id)
)