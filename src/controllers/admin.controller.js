import adminService from "../services/admin.service.js";
import bcrypt from "bcrypt";

const create = async (req, res) => {
  try {
    var { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({ message: "Submit all fields for registration" });
    }

    password = await bcrypt.hash(password, 10);
    const admin = await adminService.create({username, email, password});

    if (!admin) {
      return res.status(400).send({ message: "Error creating admin" });
    }

    res.status(201).send({
      message: "admin created successfully",
      admin: {
        id: admin[0].admin_id,
        username,
        email,
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const admins = await adminService.findAllService();

    if (admins.lenght === 0) {
      return res
        .status(400)
        .send({ message: "There are no registered admins" });
    }

    res.status(201).send(admins);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const admin = req.admin;
    res.status(201).send({
      admin: {
        id: admin[0].admin_id,
        username: admin[0].username,
        email: admin[0].email,
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const removeAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    await adminService.remove(id);
    return res.status(200).send({ message: `Admin: ${id} removido!` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export default { create, findAll, findById, removeAdmin };
