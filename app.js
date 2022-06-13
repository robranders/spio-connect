const express = require("express");
const app = express();
const port = 3000;
const { sqlconfig } = require("./private/credentials.json");
const sql = require("mssql");
const bodyParser = require("body-parser");
const appPool = new sql.ConnectionPool(sqlconfig);

const spioConnect = require("./route/spio-connect");
const v1 = require("./route/v1");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const updateRoutes = require("./dynamic-routes/dynamic-routes")(app, v1);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/spio-connect", spioConnect);
app.use("/v1", v1);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  appPool.connect().then((pool) => {
    console.log("Connected to db");
    app.locals.db = pool;
    app.locals.updateRoutes = updateRoutes;
  });
});
