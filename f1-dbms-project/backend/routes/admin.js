import express from "express";

import {
    getAllVisits,
    updateVisitStatus
} from "../sqlcontrollers/adminSQL.js";

const router = express.Router();

router.get(
    "/visits",
    getAllVisits
);

router.put(
    "/visit/:id",
    updateVisitStatus
);

export default router;