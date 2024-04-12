const Sequelize = require("sequelize");
const sequelize = require("../db/db");

const Books = sequelize.define(
  "book",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    bookName: { type: Sequelize.STRING },
  },
  {
    timestamps: false,
  }
);

module.exports = Books;
