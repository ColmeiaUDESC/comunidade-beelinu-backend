import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();

import playerRoute from "./src/routes/player.routes.js";
import adminRoute from "./src/routes/admin.routes.js"
import serverRoute from "./src/routes/server.routes.js"
import authRoute from "./src/routes/auth.routes.js";
import pingRoute from "./src/routes/ping.routes.js";


const app = express();

app.use(json());
app.use("/player", playerRoute);
app.use("/admin", adminRoute);
app.use("/server", serverRoute);
app.use("/auth", authRoute);
app.use("/ping", pingRoute);

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
