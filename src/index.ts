require("express-async-errors");
import * as express from "express";
import {RequestContext} from "@mikro-orm/core";
import controllers from "./controllers";
import {BddService} from "./services/BddService";
import {ServerSideError} from "./errors";
import {config} from "dotenv";

config();

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc/swagger.json');

app.use(express.json());
app.use(async (req, res, next) =>{
  try {
    await BddService.createOrm();
  } catch (e) {
    console.log(e);
    throw new ServerSideError();
  }
  RequestContext.create(BddService.entityManager, next);
});
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(controllers);
app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
/* const cors = require('cors')({origin: true});
app.use(cors);*/
