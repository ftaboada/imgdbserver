const express = require("express");
var fs = require("fs");
const { dir } = require("./dirMiddleware");
const { Categoria, Galeria, Imagen } = require("../db");

const router = express();

router.get("/", async (req, res) => {
  try {
    const respuesta = await Categoria.findAll({
      include: [{ model: Galeria }],
    });
    res.status(200).send(respuesta);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/", async (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) {
    return res.status(400).send("faltan parametros");
  }

  try {
    let path = dir + "/" + nombre;
    fs.mkdir(path, async (err) => {
      if (err) {
        return res.status(400).send("error directorio ya existe");
      }
      const nuevaCategoria = await Categoria.create({
        nombre,
        descripcion,
      });
      res.send(nuevaCategoria);
    });
  } catch (err) {
    res.status(400).send(err);
  }
});
router.delete("/delete/:nombre", async (req, res) => {
  const { nombre } = req.params;

  let path = dir + "/" + nombre;
  try {
    const destroyed = await Categoria.destroy({ where: { nombre } });
    fs.rmdir(path, { recursive: true }, (err) => {
      if (err) {
        return res.status(400).send("faltan parametros");
      }
      res.send("objeto borrado");
    });
  } catch (err) {
    res.status(400).send("borró carpeta, pero no categoria");
  }
});

//----------  GALERIA -----------

router.get("/:nombre", async (req, res) => {
  const { nombre } = req.params;
  try {
    const respuesta = await Galeria.findOne({
      include: [{ model: Imagen }],
      where: { nombre },
    });
    res.send(respuesta);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/:categoria/:nombre", async (req, res) => {
  const { nombre, categoria } = req.params;
  const { categoriumId, descripcion } = req.body;
  let path = dir + "/" + categoria + "/" + nombre;
  if (!nombre || !descripcion || !categoriumId) {
    return res.status(400).send("faltan parametros");
  }
  try {
    const gal = await Galeria.create({
      nombre,
      descripcion,
      categoriumId,
    });

    fs.mkdir(path, (err) => {
      if (err) {
        return res.status(400).send("faltan parametros");
      }
      return res.send(gal);
    });
  } catch (err) {
    res.status(400).send(err);
  }
});
router.delete("/:categoria/:nombre", async (req, res) => {
  const { nombre, categoria } = req.params;
  let path = dir + "/" + categoria + "/" + nombre;
  try {
    const destroyed = await Galeria.destroy({ where: { nombre } });
    fs.rmdir(path, { recursive: true }, (err) => {
      if (err) {
        return res.status(400).send("faltan parametros");
      }

      res.send(
        `la galería ${nombre} ha sido eliminada. todo su contenido también ha sido eliminado`
      );
    });
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
