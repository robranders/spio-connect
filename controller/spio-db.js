const sql = require("mssql");

exports.ListStoredProcedures = (req, res) => {
  req.app.locals.db.query(
    "Select * from sysobjects where type = 'P' and category = 0",
    (err, result) => {
      if (err) {
        console.log("Error getting stored procedures", err);
        return res.status(500).send("Something went wrong");
      }

      const { recordset } = result;

      return res.json(recordset);
    }
  );
};

exports.GetSpParameters = (req, res) => {
  req.app.locals.db.query(
    `
    SELECT
    PARAMETER_NAME,DATA_TYPE ,ORDINAL_POSITION, PARAMETER_MODE
    FROM
    INFORMATION_SCHEMA.PARAMETERS
    WHERE
    SPECIFIC_NAME='${req.params.name}'
  `,
    (err, result) => {
      if (err) {
        console.log("Error getting stored procedure parameters", err);
        return res.status(500).send("Something went wrong");
      }

      const { recordset } = result;

      return res.json(recordset);
    }
  );
};
