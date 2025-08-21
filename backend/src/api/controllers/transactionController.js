import transactionService from "../services/transactionServices.js";

const newExpense = async (req, res) => {
  try {
    const expenseData = req.body;
    const newExpense = await transactionService.addExpense(expenseData);
    console.log("New Expense Created:", newExpense);
    res
      .status(201)
      .json({ message: "expense created successfully", data: newExpense });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const newIncome = async(req, res) => {
  try {
    const incomeData = req.body;
    const newIncome = await transactionService.addIncome(incomeData);
    console.log("New Income Created:", newIncome);
    res
      .status(201)
      .json({ message: "income created successfully", data: newIncome });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export default {
  newExpense,
  newIncome,
};
