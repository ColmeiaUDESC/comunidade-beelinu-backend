import serverServices from "../services/server.service.js";

const temporaryServers = [];
var temporaryServerId = 0;

const create = async (req, res) => {
  try {
    const { server_name, server_ip, server_port } = req.body;

    if (!server_name || !server_ip || !server_port) {
      return res
        .status(400)
        .send({ message: "Submit all fields for registration" });
    }

    const server = await serverServices.create(
      server_name,
      server_ip,
      server_port
    );

    if (!server[0]) {
      return res.status(400).send({ message: "Error on creating Server" });
    }

    return res.status(200).send(server[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const removeServer = async (req, res) => {
  try {
    const id = req.params.id;
    await serverServices.remove(id);
    return res.status(200).send({ message: `Server: ${id} removido!` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const createTemporary = (req, res) => {
  const { server_name, server_port } = req.body;
  const player_id = req.id;

  if (!server_name || !server_port) {
    return res
      .status(400)
      .send({ message: "Submit all fields for registration" });
  }
  temporaryServerId += 1;
  temporaryServers.push({
    temporaryServerId: temporaryServerId,
    server_name: server_name,
    server_ip: req.ip,
    server_port: server_port,
    created_by: player_id,
  });
  return res.status(200).send(req.body);
};

const findTemporaryById = (req, res) => {
  const id = req.params.id
  for (let i = 0; i < temporaryServers.length; i++) {
    if (temporaryServers[i].temporaryServerId == id) {
      return res.status(200).send(temporaryServers[i]);
    }
  }
  return res.status(400).send({ message: "Server not found" })
};

const removeTemporary = (req, res) => {
  const id = req.params.id
  const player = req.id;
  for (let i = 0; i < temporaryServers.length; i++) {
    if (temporaryServers[i].temporaryServerId == id) {
      if (player != temporaryServers[i].created_by) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      let temp = temporaryServers[i]
      temporaryServers.splice(i, 1);
      return res.status(200).send({ message: "Removed!", temporaryServerRemoved: temp })
    }
  }
  return res.status(400).send({ message: "Id not found" })
};

const findAll = async (req, res) => {
  try {
    const server = await serverServices.findAll();
    res.status(200).send({
      servers: server,
      temporaryServers: temporaryServers,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const server = await serverServices.findById(id);
    if (server.length == 0) {
      return res.status(400).send({ message: "Server not found" });
    }
    return res.status(200).send(server);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export default { create, createTemporary, removeTemporary, findAll, findTemporaryById, findById, removeServer };
