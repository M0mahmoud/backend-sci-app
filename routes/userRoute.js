import { Router } from "express";

import {
  adminGetUsers,
  deleteUser,
  getOneUser,
} from "../controller/userController.js";
import isAuthenticated from "../middleware/isAuth.js";

const router = Router();
router
  .route("/users")
  .get(isAuthenticated, adminGetUsers)
  .delete(isAuthenticated, deleteUser);

router.get("/user", getOneUser);
export default router;
