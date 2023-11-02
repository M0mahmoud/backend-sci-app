import { Router } from "express";

import { adminGetUsers, deleteUser } from "../controller/userController.js";
import isAuthenticated from "../middleware/isAuth.js";

const router = Router();
router
  .route("/users")
  .get(isAuthenticated, adminGetUsers)
  .delete(isAuthenticated, deleteUser);

export default router;
