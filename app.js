import express from "express";
import todoRoutes from "./src/routes/todoRoutes.js";
import { sequelize } from "./src/config/dbconfig.js";
const app = express();
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
