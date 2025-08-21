import express from 'express';

const router = express.Router();

import transactionRoutes from './transactionRoutes.js';

router.use(transactionRoutes);




export default router;