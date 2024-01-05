const { Router } = require("express");

const {
  adminGetUsers,
  deleteUser,
  editPlantTreatment,
  getOneUser,
  getPlantTreatment,
} = require("../controller/userController");
const isAuthenticated = require("../middleware/isAuth");

const router = Router();
router
  .route("/users")
  .get(isAuthenticated, adminGetUsers)
  .delete(isAuthenticated, deleteUser);

router
  .route("/treatment")
  .patch(isAuthenticated, editPlantTreatment)
  .get(getPlantTreatment);

router.get("/user", getOneUser);
module.exports = router;
