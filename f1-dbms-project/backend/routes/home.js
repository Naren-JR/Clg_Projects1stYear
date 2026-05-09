import express from "express";

import {
    getAnnouncements,
    createAnnouncement
} from "../sqlcontrollers/homeSQL.js";

const router = express.Router();

router.get(
    "/announcements",
    getAnnouncements
);

router.post(
    "/announcements",
    createAnnouncement
);

export default router;