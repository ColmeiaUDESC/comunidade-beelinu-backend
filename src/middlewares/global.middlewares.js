import playerService from "../services/player.service.js";

const validPlayer = async (req, res, next) => {
  try {
    const id = req.params.id;

    const player = await playerService.findById(id);

    if (!player[0]) {
      return res.status(400).send({ message: "player not found" });
    }
    req.id = id;
    req.player = player;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { validPlayer };
