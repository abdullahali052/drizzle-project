import { shortnerRoutes } from "./routes/shortner.routes.js";
import path from "path";
import express from "express";
const app = express();

const DATA_FILE = path.join("data", "links.json");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//express router
app.use(shortnerRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
