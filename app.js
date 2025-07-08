import { shortnerRoutes } from "./routes/shortner.routes.js";
import express from "express";
import { authRoutes } from "./routes/auth.routes.js";
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//express router
app.use(authRoutes);
app.use(shortnerRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
