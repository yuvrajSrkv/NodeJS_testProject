const express = require("express");
const route = express.Router();
const bookReturn = require("../controllers/bookReturn");

route.post("/", bookReturn.bookReturnPost);
route.get("/", bookReturn.bookReturnGet);

module.exports = route;
