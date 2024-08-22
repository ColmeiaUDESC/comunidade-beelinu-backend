import playerService from "../services/player.service.js";
import inventoryService from "../services/inventory.service.js";
import bcrypt from "bcrypt";

const create = async (req, res) => {
  try {
    var { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({ message: "Submit all fields for registration" });
    }

    password = await bcrypt.hash(password, 10);
    const player = await playerService.create({username, email, password});

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

const removePlayer = async (req, res) => {
  try {
    const id = req.params.id;
    if(req.id != id){
      return res.status(401).send({ message: "Unauthorized" });
    }
    const inventory = await inventoryService.findById(id);
    await inventoryService.remove(inventory[0].inventory_id);
    await playerService.remove(id);
    return res.status(200).send({ message: `Player: ${id} removido!` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export default { create, findAll, findById, removePlayer };
