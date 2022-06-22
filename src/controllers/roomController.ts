import {Router} from "express";
import {Room} from "../bdd/entities";
import {BadRequestError} from "../errors";
import {BddService} from "../services/BddService";
import {authVerification} from "./commonMiddlewares/authMiddlewares";

const router = Router();

router.post("/create", authVerification, async function(req, res, next) {
  const room = await BddService.roomHandler.createRoom(req.body);

  if (room != null) return res.status(200).send(room);
  else throw new BadRequestError("Invalid Room Data");
});

router.get("/", authVerification, async function(req, res, next) {
  const rooms = await BddService.roomHandler.findAll();
  if (rooms != null) {
    return res.status(200).send(rooms);
  } else {
    throw new BadRequestError("No Rooms available");
  }
});

router.get("/room/:id", authVerification, async function(req, res, next) {
  const idRoom: number = +req.params.id;

  if (isNaN(idRoom) || idRoom === 0) {
    throw new BadRequestError("Room id not valid");
  }

  const room = <Room> await BddService.roomHandler.findRoomById(idRoom);
  return res.status(200).send(room);
});

export {router as roomController};
