require("express-async-errors");
import * as express from "express";
import {RequestContext} from "@mikro-orm/core";
import controllers from "./controllers";
import {BddService, LoggerService} from "./services";
import {ServerSideError} from "./errors";
import {config} from "dotenv";

config();

const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc/swagger.json");

app.use(express.json());
app.use(async (req, res, next) =>{
  LoggerService.createLogger();
  try {
    await BddService.createOrm();
  } catch (e) {
    console.log(e);
    throw new ServerSideError();
  }
  RequestContext.create(BddService.entityManager, next);
});
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(controllers);
app.listen(80, () => {
  console.log(`Example app listening on port ${80}`);
});
/* const cors = require('cors')({origin: true});
app.use(cors);*/
