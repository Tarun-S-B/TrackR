import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new expense transaction
// This function will be called from the controller to add a new expense
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

// Create a new income transaction
// This function will be called from the controller to add a new income
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

const addRecurring = async (recurringData) => {
    const { amount, description, category, frequency, transactOn, startDate, endDate, roi, transactionType } = recurringData;

    const newTransaction = await prisma.recurringTransaction.create({
        data: {
            amount: parseFloat(amount),
            type: transactionType,
            category: category,
            description: description,
            frequency: frequency,
            transactOn: parseInt(transactOn),
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            roi: roi ? parseFloat(roi) : null,
            createdAt: new Date(),
            account: {
                connect: {
                    id: "demo-account-id"
                }
            }
        }
    });

    return newTransaction;
}

// Fetch transactions by user ID and expense type
const getTransactionsByUserIdAndType = async (page = 1, limit = 10, userId, type) => {
    const pageNum = Math.max(1, Number(page));
    const limitNum = Number(limit);

    const skip = Math.max(0, (pageNum - 1) * limitNum);
    console.log(`Page:${pageNum} ${page}\n limit:${limit} ${limitNum}\n userId:${userId}\nskp:${skip}\n`)    
    try {
        const fetchedTransactions = await prisma.transaction.findMany({
            where: {
                type: type,
                accountId: userId
            },
            skip: skip,
            // skip: 0,
            take: limitNum,
            orderBy: {
                date: 'desc',
            },
        });

        const totalCount = await prisma.transaction.count({
            // where: {
            //     type: type,
            //     accountId: userId  
            // }
            where: {
                account: {
                    is: {
                        id: userId
                    }
                }
            }
        });

        console.log(fetchedTransactions);
        return {
            transactions: fetchedTransactions,
            totalPages: Math.ceil(totalCount / limitNum), // ✅ Fixed: Use limitNum instead of limit
            currentPage: parseInt(page, 10),
        };

    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getRecurringTransactionsByUserId = async (page = 1, limit = 10, userId) => {
    const pageNum = Math.max(1, Number(page));
    const limitNum = Number(limit);

    const skip = Math.max(0, (pageNum - 1) * limitNum);

    try {
        const fetchedRecurringTransactions = await prisma.recurringTransaction.findMany({
            where: {
                account: {
                    is: {
                        id: userId
                    }
                }
            },
            skip: skip,
            take: limitNum,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalCount = await prisma.recurringTransaction.count({
            where: {
                account: {
                    is: {
                        id: userId
                    }
                }
            }
        });

        console.log(fetchedRecurringTransactions);
        return {
            transactions: fetchedRecurringTransactions,
            totalPages: Math.ceil(totalCount / limitNum), // ✅ Fixed: Use limitNum instead of limit
            currentPage: parseInt(page, 10),
        };

    } catch (error) {
        console.error(error);
        throw error;
    }

}

export default {
    addExpense,
    addIncome,
    addRecurring,
    getTransactionsByUserIdAndType,
    getRecurringTransactionsByUserId,
};  