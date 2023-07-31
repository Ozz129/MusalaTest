const dbConnectNoSql = require("./config/mongo");
const express = require("express");
const  { dischargeBattery, updateBatteryStatus} = require('./utils/automaticTask')
const port = 3000;
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Swagger configuration options
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Musala Test Challenge',
        version: '1.0.0',
        description: 'API description',
      },
      servers: [
        {
          url: "http://localhost:3000/api",
        }
      ],
    },
    apis: ["./routes/*.js"],
    components: {
      schemas: {
        dispatch: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
         },
        }
      }
    }
  };

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Set the interval for the periodic task (every 5 seconds in this example)
const interval = 5000; // 5 seconds

// Start the periodic task
setInterval(dischargeBattery, interval);
setInterval(updateBatteryStatus, interval);

app.use(express.json())
dbConnectNoSql();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", require("./routes"));

app.listen(port, () => {
    console.log('server running')
});
