const express = require("express");
const Admin = require("./admin");
const Imagen = require("./imagen");

const router = express();
//rutas!
router.use("/admin", Admin);
router.use("/imagen", Imagen);

module.exports = router;
