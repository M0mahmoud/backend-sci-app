import { Router } from "express";
import { getUsers, createUser } from "../controller/userController.js";

const router = Router();
router.route("/")
  .get(getUsers)
  .post(createUser);

export default router;
