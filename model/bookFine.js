const Sequelize = require("sequelize");
const sequelize = require("../db/db");

const BookFine = sequelize.define(
  "BookFine",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    fine: { type: Sequelize.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
);

module.exports = BookFine;
