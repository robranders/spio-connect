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
