import { Router } from "express";

import { getUser } from "../controller/userController.js";

const router = Router();
router.route("/").post(getUser);

export default router;
