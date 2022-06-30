require("express-async-errors");
// Import services and app process
import {RequestContext} from "@mikro-orm/core";
import {config} from "dotenv";
import {createServices, services} from "./services/services";

// Init process and api services
config();
createServices();


// Import routes and express
import * as express from "express";
import routes from "./routes";

// Create express app
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc/swagger.json");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(async (req, res, next) =>{
  RequestContext.create(services.bdd.entityManager, next);
});
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
/* const cors = require('cors')({origin: true});
app.use(cors);*/
