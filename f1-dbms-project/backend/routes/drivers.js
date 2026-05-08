import express from "express";
import { getDriversPage } from "../sqlcontrollers/driversSQL.js";

const router = express.Router();

router.get("/drivers", getDriversPage);

export default router;