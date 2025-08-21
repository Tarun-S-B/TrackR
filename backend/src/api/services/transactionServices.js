import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addExpense = async (expenseData) => {
    const { amount, description, category, expenseDate } = expenseData;

    const newTransaction = await prisma.transaction.create({
        data: {
            amount: amount,
            type: "EXPENSE",
            category: category,
            description: description,
            date: new Date(expenseDate),
            createdAt: new Date(),
            accountId: "demo-account-id"
        }
    });

    return newTransaction;
};

const addIncome = async (incomeData) => {
    const { amount, description, category, incomeDate } = incomeData;

    const newTransaction = await prisma.transaction.create({
        data: {
            amount: amount,
            type: "INCOME",
            category: category,
            description: description,
            date: new Date(incomeDate),
            createdAt: new Date(),
            accountId: "demo-account-id"
        }
    });

    return newTransaction;
}

export default {
    addExpense,
    addIncome,
};  