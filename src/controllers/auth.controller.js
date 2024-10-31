import bcrypt from "bcrypt";
import {
  adminLoginService,
  playerLoginService,
  generateToken,
} from "../services/auth.service.js";
import { auth_player } from "./server.controller.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminLoginService(email);
    if (admin.length == 0) {
      return res.status(404).send({ message: "Admin or password not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, admin[0].password);

    if (!passwordIsValid) {
      return res.status(404).send({ message: "Admin or password not found" });
    }
    const token = generateToken(admin[0].admin_id);

    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const playerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const player = await playerLoginService(email);
    if (player.length == 0) {
      return res.status(404).send({ message: "player or password not found" });
    }

    const passowrdIsValid = bcrypt.compareSync(password, player[0].password);

    if (!passowrdIsValid) {
      return res.status(404).send({ message: "player or password not found" });
    }

    const token = generateToken(player[0].player_id);

    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const temporaryAuth = async (req, res) => {
  try {
    const { player, pin } = req.body;

    if (!pin || !player) {
      return res.status(404).send({ message: "Missing PIN or Player" });
    }
    const index = auth_player.findIndex((obj) => obj.player_id == player.player_id);

    console.log(index)
    if (index == -1){
      return res.status(404).send({ message: "Missing PIN" });
    }

    if (auth_player[index].pin != pin) {
      return res.status(404).send({ message: "Wrong PIN" });;
    }
    
    auth_player.splice(index, 1);
    res.send({ player, pin });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { adminLogin, playerLogin, temporaryAuth };
