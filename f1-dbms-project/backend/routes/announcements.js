import express from "express";

import {
    getAnnouncements,
    createAnnouncement
} from "../sqlcontrollers/announcementSQL.js";

const router = express.Router();

router.get(
    "/",
    getAnnouncements
);

router.post(
    "/",
    createAnnouncement
);

export default router;