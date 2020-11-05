const express = require("express");
const sharp = require("sharp");

const { dir } = require("./dirMiddleware");

const router = express();

router.get("/:size/:categoria/:galeria/:nombre/", (req, res) => {
  let { categoria, galeria, nombre, size } = req.params;
  size = parseInt(size);

  sharp(`${dir}/${categoria}/${galeria}/${nombre}`)
    .resize(size)
    .toBuffer()
    .then((data) => {
      res.type("png").send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
