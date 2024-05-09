import playerService from "../services/player.service.js";

const create = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password ) {
      res.status(400).send({ message: "Submit all fields for registration" });
    }

    const player = await playerService.create(req.body);

    if (!player) {
      return res.status(400).send({ message: "Error creating User" });
    }

    res.status(201).send({
      message: "Player created successfully",
      player: {
        id: player.id,
        username,
        email,
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
      return res.status(400).send({ message: "There are no registered players" });
    }

    res.send(players);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const player = req.player;

    res.send(player);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll, findById };
