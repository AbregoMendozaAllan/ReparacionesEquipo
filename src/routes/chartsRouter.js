import express from 'express';
import { renderChartsPage, generateChartsImage } from '../controllers/chartController.js';

const router = express.Router();

router.get('/', renderChartsPage);
router.get('/charts/image', generateChartsImage);

export default router;
