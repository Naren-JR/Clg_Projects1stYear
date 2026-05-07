import express from 'express';
import { getTeamsPage } from '../sqlcontrollers/teamsSQL.js';

const router = express.Router();

router.get('/', getTeamsPage);

export default router;