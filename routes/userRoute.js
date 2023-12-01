import { Router } from "express";

import {
  adminGetUsers,
  deleteUser,
  editPlantTreatment,
  getOneUser,
  getPlantTreatment,
} from "../controller/userController.js";
import isAuthenticated from "../middleware/isAuth.js";

const router = Router();
router
  .route("/users")
  .get(isAuthenticated, adminGetUsers)
  .delete(isAuthenticated, deleteUser);

router.route("/treatment").patch(editPlantTreatment).get(getPlantTreatment);

router.get("/user", getOneUser);
export default router;
