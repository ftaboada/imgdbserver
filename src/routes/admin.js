const router = require("express").Router();
const { Usuario } = require("../db.js");

router.post("/", async (req, res) => {
  try {
    const admin = await Usuario.create({
      nombre: "Rapaz",
      rol: "Reina",
      email: "acb@abc.cl",
      password: "violeta1",
    });
    return res.status(201).send("admin creado con éxito");
  } catch (error) {
    return res.status(400).send("admin ya existe");
  }
});
module.exports = router;
