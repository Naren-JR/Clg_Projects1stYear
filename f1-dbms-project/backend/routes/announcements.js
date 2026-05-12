import express from "express";

import {
    getAnnouncements,
    createAnnouncement,
    deleteAnnouncement
}
    from "../sqlcontrollers/announcementSQL.js";

const router =
    express.Router();

router.get(
    "/",
    getAnnouncements
);

router.post(
    "/",
    createAnnouncement
);

router.delete(
    "/:id",
    deleteAnnouncement
);

export default router;