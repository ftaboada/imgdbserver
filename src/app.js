require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index");
const cors = require("cors");

const server = express();

const options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  },
};

server.name = "Rapaz";
server.use(morgan("dev"));
server.use(express.static("public", options));
server.use(cors());
server.use("/", routes);

module.exports = server;
