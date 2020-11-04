const express = require("express");
const fileUpload = require("express-fileupload");
var fs = require("fs");

const router = express();

router.use(fileUpload());
//subir imagen
router.post("/upload", function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("ningún archivo fue cargado");
  }
  const nombre = req.files.file.name;
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.file;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`public/${nombre}`, function (err) {
    if (err) return res.status(500).send(err);

    res.send("Imagen Subida");
  });
});
//borrar imagen
router.delete("/:nombre", async (req, res) => {
  try {
    const nombre = req.params.nombre;
    fs.unlinkSync(`/public/${nombre}`);
    res.send("imagen eliminada");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
