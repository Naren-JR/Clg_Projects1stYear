import express from "express";

import { getVisit, cancelVisit } from "../sqlcontrollers/myvisitSQL.js";

const router = express.Router();

router.get("/:formid", getVisit);

router.put("/cancel/:id", cancelVisit);

export default router;
