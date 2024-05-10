import playerService from "../services/player.service.js";
import inventoryService from "../services/inventory.service.js";

const create = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).send({ message: "Submit all fields for registration" });
    }

    const player = await playerService.create(req.body);

    if (!player) {
      return res.status(400).send({ message: "Error creating Player" });
    }
    const inventory = await inventoryService.create(player[0].player_id);

    if (!inventory) {
      return res.status(400).send({ message: "Error creating Inventory" });
    }

    res.status(201).send({
      message: "Player created successfully",
      player: {
        id: player[0].player_id,
        username,
        email,
      },
      inventory: {
        id: inventory[0].inventory_id,
        player_id: inventory[0].player_id,
        id_items: inventory[0].id_items,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const players = await playerService.findAllService();

    if (players.lenght === 0) {
      return res
        .status(400)
        .send({ message: "There are no registered players" });
    }

    res.status(201).send(players);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const player = req.player;
    const inventory = await inventoryService.findById(player[0].player_id)
    res.status(201).send({
      player: {
        id: player[0].player_id,
        username: player[0].username,
        email: player[0].email,
      },
      inventory: {
        id: inventory[0].inventory_id,
        player_id: inventory[0].player_id,
        id_items: inventory[0].id_items,
      },
    });;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll, findById };
