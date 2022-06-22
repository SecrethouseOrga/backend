import {Router} from "express";
import {BddService, ErrorService} from "../services";
import {BadRequestError} from "../errors";
import {castToLoginData, castToUserData} from "../types/request/bodyData";
import {authVerification, tokenGeneration} from "./commonMiddlewares";
const router = Router();

router.post("/register", async function(req, res, next) {
  const userData = castToUserData(req.body);
  if (userData === null) throw new BadRequestError("Invalid User Data");
  try {
    const user = await BddService.userHandler.createUser(userData);
    req.currentUser = {
      email: user.email,
      id: user.id,
    };
  } catch (e) {
    throw ErrorService.handleError(e);
  }
  next();
}, tokenGeneration);

router.post("/login", async function(req, res, next) {
  const login = castToLoginData(req.body);
  if (login == null) throw new BadRequestError("Invalid Login Data");
  try {
    const user = await BddService.userHandler.findUserByEmail(login.email);
    req.currentUser = {
      email: user.email,
      id: user.id,
    };
  } catch (e) {
    throw ErrorService.handleError(e);
  }
  next();
}, tokenGeneration);

router.get("/testtoken", authVerification, function(req, res, next) {
  console.log("auth success");
  return res.status(200).send("success");
});
export {router as authController};
