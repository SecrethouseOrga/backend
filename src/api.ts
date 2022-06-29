import {createServices, services} from "./services/services";

require("express-async-errors");
import * as express from "express";
import {RequestContext} from "@mikro-orm/core";
import {config} from "dotenv";
import routes from "./routes";

config();
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc/swagger.json");

createServices();

app.use(express.json());
app.use(async (req, res, next) =>{
  RequestContext.create(services.bdd.entityManager, next);
});
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);
app.listen(80, () => {
  console.log(`Example app listening on port ${80}`);
});
/* const cors = require('cors')({origin: true});
app.use(cors);*/
