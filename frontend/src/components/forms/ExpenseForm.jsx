import { useState } from "react";
import { X } from "lucide-react";
import { postToBackend } from "../../apiService";

const ExpenseForm = ({ setShowExpenseForm }) => {
    
  const [expenseData, setExpenseData] = useState({
    amount: "",
    expenseType: "other",
    description: "",
    expenseDate: new Date().toISOString().split("T")[0],
    account: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Expense Form Submitted");
    setShowExpenseForm(false);

    // const formData = new FormData(e.target);
    // const expenseData = Object.fromEntries(formData.entries());

    // Send to backend
    console.log(expenseData);
    try {
        const result = await postToBackend("/api/transactions/newexpense", expenseData);
        console.log("backend response:", result);
    } catch (error) {
        console.error("Error sending expense data to backend:", error);
    }
  };

  const handleClose = () => {
    setShowExpenseForm(false);
  };

  return (
    // Use a div with a flexbox column layout for clean spacing.
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">New Expense</h2>
        {/* ACCESSIBILITY: The close icon is a proper button for screen readers. */}
        <button
          onClick={handleClose}
          className="p-1 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
          aria-label="Close form"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Input */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <input
            id="amount" // SEMANTICS: `id` matches the label's `htmlFor`
            name="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={expenseData.amount}
            onChange={handleChange}
            // STYLING: Consistent input styling
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Category Radio Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {["food", "transport", "entertainment", "utilities", "other"].map(
              (type) => (
                <label
                  key={type}
                  htmlFor={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    id={type}
                    type="radio"
                    name="category"
                    value={type}
                    checked={expenseData.category === type}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    required
                  />
                  <span className="text-gray-700">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Description Textarea */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="e.g., Groceries from store"
            value={expenseData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        {/* Date Input */}
        <div>
          <label
            htmlFor="expenseDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            id="expenseDate"
            name="expenseDate"
            type="date"
            value={expenseData.expenseDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
