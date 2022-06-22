import {Router} from "express";
import {Room} from "../bdd/entities";
import {BddService} from "../services/BddService";
import {
  authVerification,
  checkId,
  objectCreated,
  sendData,
} from "./commonMiddlewares";
import {ErrorService, Operation} from "../services/ErrorService";

const router = Router();

router.post("/", authVerification, async function(req, res, next) {
  try {
    await BddService.roomHandler.createRoom(req.body);
  } catch (e) {
    ErrorService.handleError(e);
  }
  next();
}, objectCreated);

router.get("/", authVerification, async function(req, res, next) {
  try {
    req.dataToSend = await BddService.roomHandler.findAll();
  } catch (e) {
    ErrorService.handleError(e, Operation.FIND);
  }
  next();
}, sendData);

router.get("/:id", authVerification, checkId, async function(req, res, next) {
  const idRoom: number = +req.params.id;
  try {
    req.dataToSend = <Room> await BddService.roomHandler.findRoomById(idRoom);
  } catch (e) {
    ErrorService.handleError(e, Operation.FIND);
  }
  next();
}, sendData);

export {router as roomController};
