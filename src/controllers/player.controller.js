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
        id: player[0].id,
        username,
        email,
      },
      inventory: {
        id: inventory[0].id,
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

    res.send(players);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const player = req.player;

    res.send(player[0]);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll, findById };
