import express from "express";
import bodyParser from "body-parser";
import config from "./config/config";
import route from "./routes/index";
import sequelize from "./config/database";

const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Your routes here
app.use("/api", route);

const port: number = config.port || 3000;

// Load all the models to the db, check connection and start app
sequelize
  .sync()
  .then(() => {
    console.log("db connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error: Error) => console.log(`error connecting: ${error.message}`));
