const Sequelize = require("sequelize");
const sequelize = require("../db/db");

const BookEntry = sequelize.define(
  "bookEntry",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    updatedAt: false,
  }
);

module.exports = BookEntry;
