const { Router } = require("express");
const { getUsers, createUser } = require("../controller/userController");

const router = Router();
router.route("/").get(getUsers).post(createUser);

module.exports = router;
