import inventoryService from "../services/inventory.service.js";

const addItems = async (req, res) => {
  try {
    const player = req.player;
    const { id_items } = req.body;

    if (!player || !id_items) {
      return res.status(500).send({ message: "Player ou id_item incorrect" });
    }

    const inventory = await inventoryService.addItem(
      player[0].player_id,
      id_items
    );

    if (!inventory) {
      return res.status(500).send({ message: "Error finding Inventory" });
    }

    return res.status(200).send(inventory[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const player = req.player;
    const inventory = await inventoryService.findById(player[0].player_id);

    if (!inventory) {
      return res.status(500).send({ message: "Error finding Inventory" });
    }

    res.status(200).send(inventory[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const removeItem = async (req, res) => {
  try {
    const player = req.player;
    const itemId = req.params.itemId;
    const inventory = await inventoryService.removeItem(player[0].player_id, itemId);

    if (!inventory) {
      return res.status(500).send({ message: "Error finding Inventory" });
    }

    res.status(200).send(inventory[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { addItems, findById, removeItem };
