import express from "express";

import {
    submitVisit
} from "../sqlcontrollers/visitSQL.js";

const router = express.Router();

router.post("/", submitVisit);

export default router;