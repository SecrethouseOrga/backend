import {Router} from "express";
import {buzzController} from "./buzzController";
import {BddService, ErrorService} from "../../services";
import {objectCreated, checkId} from "../commonMiddlewares";

const router = Router();
router.put("/:id", checkId, async function(req, res, next) {
  const eventId = +req.params.id;
  try {
    req.dataToSend = await BddService.eventHandler.updateEvent(eventId, req.body);
  } catch (e) {
    throw ErrorService.handleError(e);
  }
  next();
}, objectCreated);
router.use("/buzzs", buzzController);
export {router as eventController};
