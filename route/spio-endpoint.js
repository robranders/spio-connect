const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {
  const { name, path, method } = req.body;
  const { err } = req.app.locals.updateRoutes(name, path, method);

  if (err) {
    return res.status(500).send(err);
  }

  return res.status(201).send();
});

module.exports = router;
