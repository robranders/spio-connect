const sql = require("mssql");
const { sqlconfig } = require("./private/credentials.json");

const main = async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    console.log("connecting...");
    await sql.connect(sqlconfig);

    const result = await sql.query("select top 10 * from local_debug_log");
    console.dir(result);
  } catch (err) {
    // ... error checks
  }
};

main();



const express = require('express')
const sql = require('mssql')
const config  = {/*...*/}
//instantiate a connection pool
const appPool = new sql.ConnectionPool(config)
//require route handlers and use the same connection pool everywhere
const route1 = require('./routes/route1')
const app = express()
app.get('/path', route1)

//connect the pool and start the web server when done
appPool.connect().then(function(pool) {
  app.locals.db = pool;
  const server = app.listen(3000, function () {
    const host = server.address().address
    const port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
  })
}).catch(function(err) {
  console.error('Error creating connection pool', err)
});

Then the route uses the connection pool in the app.locals object:

// ./routes/route1.js
const sql = require('mssql');

module.exports = function(req, res) {
  req.locals.db.query('SELECT TOP 10 * FROM table_name', function(err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    res.status(200).json({ message: 'success' })
  })
}
