import {Router} from "express";
import {gameController} from "./gameController";
import {playerController} from "./playerController";
import {roomController} from "./roomController";
import {roomGameController} from "./roomGameController";
import {errorHandler} from "./commonMiddlewares/errorMiddleware";
import {RouteNotFoundError} from "../errors";
import {eventController} from "./eventControllers";
import {authController} from "./authController";

const router = Router();

router.use("/auth", authController);
// router.use("/services", authController);
router.use("/games", gameController);
router.use("/players", playerController);
router.use("/events", eventController);
router.use("/rooms", roomController);
router.use("/gameRooms", roomGameController);
router.use("*", (req, res, next) => {
  throw new RouteNotFoundError();
});
router.use(errorHandler);
export default router;
