const express = require("express");
const fileUpload = require("express-fileupload");
const { dir } = require("./dirMiddleware");
const fs = require("fs");
var sizeOf = require("image-size");
const { Imagen } = require("../db");

const router = express();

router.use(fileUpload());
//subir imagen
router.post("/upload", function async(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("ningún archivo fue cargado");
  }
  const nombre = req.files.file.name;
  const { categoria, galeria, galeriumId } = req.body;
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.file;
  try {
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`public/${categoria}/${galeria}/${nombre}`, async function (
      err
    ) {
      if (err) return res.status(400).send(err);
      const dimensions = sizeOf(`${dir}/${categoria}/${galeria}/${nombre}`);
      let imagen = {};
      imagen.width = dimensions.width;
      imagen.height = dimensions.height;
      imagen.src = `http://localhost:5490/${categoria}/${galeria}/${nombre}`;
      imagen.thumbsrc = `http://localhost:5490/thumbs/${categoria}/${galeria}/${nombre}`;
      imagen.vertical = dimensions.width / dimensions.height < 1 ? true : false;
      imagen.alt = `${nombre}`;
      imagen.galeriumId = galeriumId;
      const subida = await Imagen.create(imagen);
      res.send("Imagen Subida");
    });
  } catch (err) {
    res.status(400).send("oops, ha ocurrido un error");
  }
});
//borrar imagen
router.delete("/delete", async (req, res) => {
  const { categoria, galeria, nombre, id } = req.body;

  try {
    fs.unlinkSync(dir + `/${categoria}/${galeria}/${nombre}`);
    const borrada = await Imagen.destroy({ where: { id } });
    res.send("imagen eliminada");
  } catch (err) {
    res.status(400).send("no se encontró la imagen a borrar");
  }
});

module.exports = router;
