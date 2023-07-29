const dbConnectNoSql = require("./config/mongo");
const express = require("express");

const port = 3000;
const app = express();

app.use(express.json())
dbConnectNoSql();

app.use("/api", require("./routes"));

app.listen(port, () => {
    console.log('server running')
});
