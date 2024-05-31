import { Router } from 'express';
import { createAlert } from '../controllers/alertcontroller';

const router = Router();

router.post('/alerts', createAlert);

export default router;
