const express = require("express");
const Admin = require("./admin");
const Imagen = require("./imagen");
const Thumbs = require("./thumbs");
const Categoria = require("./categoria");

const router = express();
//rutas!
router.use("/admin", Admin);
router.use("/imagen", Imagen);
router.use("/categoria", Categoria);
router.use("/thumbs", Thumbs);

module.exports = router;
