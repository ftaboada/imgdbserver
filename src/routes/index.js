const express = require("express");
const Admin = require("./admin");
const Imagen = require("./imagen");
const Categoria = require("./categoria");

const router = express();
//rutas!
router.use("/admin", Admin);
router.use("/imagen", Imagen);
router.use("/categoria", Categoria);

module.exports = router;
