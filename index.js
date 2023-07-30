const dbConnectNoSql = require("./config/mongo");
const express = require("express");
const  { dischargeBattery, updateBatteryStatus} = require('./utils/automaticTask')
const port = 3000;
const app = express();

// Set the interval for the periodic task (every 5 seconds in this example)
const interval = 5000; // 5 seconds

// Start the periodic task
setInterval(dischargeBattery, interval);
setInterval(updateBatteryStatus, interval);

app.use(express.json())
dbConnectNoSql();

app.use("/api", require("./routes"));

app.listen(port, () => {
    console.log('server running')
});
