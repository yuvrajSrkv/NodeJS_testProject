require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db/db");
const app = express();
const PORT = process.env.PORT;

// models
const bookModel = require("./model/books");
const bookEntryModel = require("./model/bookEntry");
const bookReturnModel = require("./model/bookReturn");
const bookFineModel = require("./model/bookFine");

// middlewares
app.use(express.json());
app.use(cors());

// routes exporting
const bookEntry = require("./routes/bookEntry");
const bookReturn = require("./routes/bookReturn");

// routes
app.use("/bookentry", bookEntry);
app.use("/bookReturn", bookReturn);

// db associations
// bookEntryModel.belongsTo(bookModel);
bookModel.hasOne(bookEntryModel);
bookModel.hasOne(bookReturnModel);
bookModel.hasOne(bookFineModel);
// bookReturnModel.belongsTo(bookModel);
// bookFineModel.belongsTo(bookModel);

// db integration
sequelize
  .sync({ alter: true })
  .then((result) => {
    // server will start listening only if database integration is complete
    app.listen(PORT, () => {
      console.log(`Server Listening on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
