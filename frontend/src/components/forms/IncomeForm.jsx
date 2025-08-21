import { useState } from "react";
import { X } from "lucide-react";
import { postToBackend } from "../../apiService";

const IncomeForm = ({ setShowIncomeForm }) => {
  const [incomeFormdata, setIncomeFormData] = useState({
    amount: "",
    category: "salary",
    description: "",
    incomeDate: new Date().toISOString().split("T")[0],
    account: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowIncomeForm(false);

    // Send to backend
    console.log(incomeFormdata);

    try {
        const result = await postToBackend("/api/transactions/newincome", incomeFormdata); 
        console.log("backend response:", result);
    } catch (error) {
        console.error("Error sending income data to backend:", error);
    }
    
  };

  const handleClose = () => {
    setShowIncomeForm(false);
  };

  return (
    // Use a div with a flexbox column layout for clean spacing.
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">New Income</h2>
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
            htmlFor="income-amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <input
            id="income-amount" // Use a unique ID to avoid conflicts
            name="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={incomeFormdata.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Category Radio Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {["salary", "business", "freelance", "investment", "other"].map(
              (type) => (
                <label
                  key={type}
                  htmlFor={`income-${type}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    id={`income-${type}`}
                    type="radio"
                    name="category"
                    value={type}
                    checked={incomeFormdata.category === type}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
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
            htmlFor="income-description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="income-description"
            name="description"
            placeholder="e.g., Monthly salary"
            value={incomeFormdata.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            rows={3}
          />
        </div>

        {/* Date Input */}
        <div>
          <label
            htmlFor="incomeDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            id="incomeDate"
            name="incomeDate"
            type="date"
            value={incomeFormdata.incomeDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Add Income
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;
