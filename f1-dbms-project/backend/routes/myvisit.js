import express from "express";

import {
    loginVisit,
    cancelVisit
} from "../sqlcontrollers/myvisitSQL.js";

const router = express.Router();

router.post(
    "/login",
    loginVisit
);

router.put(
    "/cancel/:id",
    cancelVisit
);

export default router;