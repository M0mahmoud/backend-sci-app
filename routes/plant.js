import { Router } from "express";

import { recentPLants, uploadNewPLant } from "../controller/plantController.js";

const router = Router();
router.post("/upload", uploadNewPLant);
router.get("/recent", recentPLants);

export default router;
