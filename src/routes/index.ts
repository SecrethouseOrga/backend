import {Router} from "express";
import {errorHandler, sendResponse} from "../middlewares";
import {RouteNotFoundError} from "../errors/api";
import authRoute from "./auth.route";
import gamesRoute from "./games.route";
import playersRoute from "./players.route";
import eventsRoute from "./events.route";
import buzzsRoute from "./events/buzzs.route";
import roomtypesRoute from "./room-types.route";
import roomgameRoute from "./room-game.route";
import {services} from "../services/services";

const router = Router();

router.use("/auth", authRoute(services.bdd));
router.use("/games", gamesRoute(services.bdd));
router.use("/players", playersRoute(services.bdd));
router.use("/events", eventsRoute(services.bdd));
router.use("/buzzs", buzzsRoute(services.bdd));
router.use("/roomtypes", roomtypesRoute(services.bdd));
router.use("/roomgame", roomgameRoute(services.bdd));
router.use("*", (req, res, next) => {
  throw new RouteNotFoundError();
});
router.use(errorHandler(services.logger));
router.use(sendResponse(services.logger));

export default router;
