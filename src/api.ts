import * as path from "path";
require("express-async-errors");
// Import services and app process
import {config} from "dotenv";

// Init process and api services
config();


// Import routes and express
import * as express from "express";
import * as cors from "cors";
import routes from "./routes";

// Create express app
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc/swagger.json");

const PORT = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:4200", "https://secrethouse-front.herokuapp.com"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(express.json());

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/coverage", (req, res, next)=>{
  res.sendFile(path.join(__dirname, "../coverage/lcov-report/index.html" ));
});
app.use(routes);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
/* const cors = require('cors')({origin: true});
*/
