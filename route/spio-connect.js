const express = require("express");
const router = express.Router();
const { home } = require("../controller/spio-connect");
const spioDb = require("./spio-db");
const spioEndpoint = require("./spio-endpoint");

router.get("/", home);
router.use("/db", spioDb);
router.use("/endpoint", spioEndpoint);

module.exports = router;
