 // src/routes/priceRoutes.ts
import { Router } from 'express';
import { getCryptoPrices } from '../controllers/priceController';

const router = Router();

router.get('/prices', getCryptoPrices);

export default router;
