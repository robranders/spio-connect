const sql = require("mssql");

module.exports = (appRef, config) => {
  const { storedProcedure, parameterMap } = config;
  return (req, res) => {
    const r = req.app.locals.db.request();

    parameterMap.forEach(({ url, sp }) => {
      r.input(sp, sql.VarChar, req.query[url]);
    });

    // Execute stored procedure here and give back response
  };
};
