import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();

import userRoute from "./src/routes/player.routes.js";
//import authRoute from "./src/routes/auth.routes.js";
//import newsRoute from "./src/routes/news.routes.js";


const app = express();

app.use(json());
app.use("/player", userRoute);
//app.use("/auth", authRoute);
//app.use("/news", newsRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
