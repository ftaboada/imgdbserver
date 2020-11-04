const express = require("express");

const router = express();
//rutas!
router.get("/", (req, res) => {
  res.status(200).send("online!");
});

module.exports = router;
