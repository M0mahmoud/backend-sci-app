const { Router } = require("express");

const { signIn, signUp } = require("../controller/authController");
const { signInValidation, signUpValidation } = require("../validation/auth");

const router = Router();

router.post("/signup", signUpValidation, signUp);
router.post("/signin", signInValidation, signIn);

module.exports = router;
