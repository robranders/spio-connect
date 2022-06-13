const express = require("express");
const router = express.Router();
const {
  ListStoredProcedures,
  GetSpParameters
} = require("../controller/spio-db");

router.get("/", (req, res) => {
  res.send("db router");
});

router.get("/sp/list", ListStoredProcedures);

router.get("/sp/:name/parameters", GetSpParameters);

module.exports = router;
