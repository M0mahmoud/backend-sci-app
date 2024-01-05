const { Router } = require("express");

const {
  recentPLants,
  uploadNewPLant,
} = require("../controller/plantController");

const router = Router();
router.post("/upload", uploadNewPLant);
router.get("/recent", recentPLants);

module.exports = router;
