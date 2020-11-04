const express = require("express");
var fs = require("fs");
const { dir } = require("./dirMiddleware");
const { Categoria } = require("../db");

const router = express();

router.post("/", (req, res) => {
  nombre = req.body.nombre;
  let path = dir + "/" + nombre;
  fs.mkdir(path, (err) => {
    if (err) {
      return console.error(err);
    }
    res.send("La categoría ha sido creada correctamente");
  });
});
router.delete("/delete/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  let path = dir + "/" + nombre;
  fs.rmdir(path, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }

    res.send(
      `la categoria ${nombre} ha sido eliminada. todo su contenido también ha sido eliminado`
    );
  });
});

//----------  GALERIA -----------

router.post("/:id/:nombre", (req, res) => {
  const { id, nombre } = req.params;
  const { categoria } = req.body;
  let path = dir + "/" + categoria + "/" + nombre;
  fs.mkdir(path, (err) => {
    if (err) {
      return console.error(err);
    }
    res.send("La galería ha sido creada correctamente");
  });
});
router.delete("/:id/:nombre", (req, res) => {
  const { id, nombre } = req.params;
  const { categoria } = req.body;
  let path = dir + "/" + categoria + "/" + nombre;
  fs.rmdir(path, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }

    res.send(
      `la galería ${nombre} ha sido eliminada. todo su contenido también ha sido eliminado`
    );
  });
});
module.exports = router;
