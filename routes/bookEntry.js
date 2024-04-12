const express = require("express");
const route = express.Router();
const bookEntry = require("../controllers/bookEntry");

route.post("/", bookEntry.bookPost);
route.get("/", bookEntry.bookGet);

module.exports = route;
