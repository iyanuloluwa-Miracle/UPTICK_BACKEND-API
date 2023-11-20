import cors from "cors";
import express from "express";
import config from "./config/config";
import sequelize from "./config/database";
import route from "./routes/index";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors
app.use(cors());

// Your routes here
app.use("/api", route);

const port: number = config.port || 3000;

// Load all the models to the db, check connection and start app
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("db connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error: Error) => console.log(`error connecting: ${error.message}`));
