import express from 'express';
import { getRaces } from '../sqlcontrollers/racesSQL.js';

const router = express.Router();

router.get('/', getRaces);

export default router;