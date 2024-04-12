const Sequelize = require("sequelize");
const sequelize = require("../db/db");

const BookReturn = sequelize.define(
  "bookReturn",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    entryTime: { type: Sequelize.DATE },
  },
  {
    updatedAt: false,
  }
);

module.exports = BookReturn;
