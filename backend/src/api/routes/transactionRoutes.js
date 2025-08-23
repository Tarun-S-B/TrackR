import express from 'express';
import transactionController from '../controllers/transactionController.js';

const router = express.Router();

router.get('/transactions', transactionController.getTransactionsByUserIdAndType);
router.get('/recurringtransactions',transactionController.getRecurringTransactionsByUserId);

router.post('/transactions/newexpense', transactionController.newExpense);
router.post('/transactions/newincome', transactionController.newIncome);
router.post('/transactions/newrecurring', transactionController.newRecurring);


export default router;