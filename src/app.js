require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index");
const cors = require("cors");

const server = express();

server.name = "Rapaz";
server.use(morgan("dev"));

server.use(cors());
server.use("/", routes);

module.exports = server;
