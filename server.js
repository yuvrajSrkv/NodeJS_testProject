require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db/db");
const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());

// db integration
sequelize
  .sync({ alert: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server Listening on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
