import express from 'express';
import transactionController from '../controllers/transactionController.js';

const router = express.Router();

router.post('/transactions/newexpense', transactionController.newExpense);
router.post('/transactions/newincome', transactionController.newIncome);

export default router;