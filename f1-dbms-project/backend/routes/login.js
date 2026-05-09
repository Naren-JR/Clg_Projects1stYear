import express from "express";
import { login } from "../sqlcontrollers/loginSQL.js";

const router = express.Router();

router.post("/login", login);

export default router;