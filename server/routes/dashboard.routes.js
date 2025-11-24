import express from 'express';
import { dashboard } from '../controllers/dashboard.js';

const router = express.Router();

router.get('/dashboard/count', dashboard);

export default router;