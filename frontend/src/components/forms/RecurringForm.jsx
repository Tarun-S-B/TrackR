import { useState } from "react";
import { X } from "lucide-react";
import { postToBackend } from "../../apiService";

const RecurringForm = ({ setShowRecurringForm }) => {


  const [recurringData, setRecurringData] = useState({
    amount: "",
    transactionType: "EXPENSE", // Savings / Spending
    category: "", // savings fd, rd, sip // expense emi, subscription
    description: "",
    frequency: "", // weekly, monthly, yearly
    transactOn: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    account: "",

    // if its fd,rd
    roi: "",
  });

  const spendingCategories = ["EMI", "Subscription"];
  const savingCategories = ["FD", "RD", "SIP"];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]; // sunday = 1 monday = 2
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecurringData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Recurring Transaction Form Submitted");
    setShowRecurringForm(false);

    console.log(recurringData);
    try {
      const result = await postToBackend("/api/transactions/newrecurring",recurringData);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowRecurringForm(false);
  };

  return (
    // Use a div with a flexbox column layout for clean spacing.
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          New Recurring Transaaction
        </h2>
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
            value={recurringData.amount}
            onChange={handleChange}
            // STYLING: Consistent input styling
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Type
          </label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="transactionType"
                value="EXPENSE"
                checked={recurringData.transactionType === "EXPENSE"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">Spending</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="transactionType"
                value="SAVING"
                checked={recurringData.transactionType === "SAVING"}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="text-gray-700">Saving</span>
            </label>
          </div>
        </div>

        {recurringData.transactionType === "EXPENSE" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {spendingCategories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={recurringData.category === cat}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300"
                    required
                  />
                  <span className="text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {recurringData.transactionType === "SAVING" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {savingCategories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={recurringData.category === cat}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 border-gray-300"
                    required
                  />
                  <span className="text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {recurringData.category === "FD" && (
          <div>
            <label>
              ROI (%)
              <input
                type="number"
                name="roi"
                value={recurringData.roi}
                onChange={handleChange}
                className="ml-2 w-30 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                step="0.01"
                placeholder="e.g., 5.5"
              />
            </label>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {/* Frequency Selection */}
          <div>
            <label
              htmlFor="frequency"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Frequency
            </label>
            <select
              id="frequency"
              name="frequency"
              value={recurringData.frequency}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select Frequency</option>
              <option value="YEARLY">Yearly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="WEEKLY">Weekly</option>
              {/* <option value="DAILY">Daily</option> */}
            </select>
          </div>

          {/* Conditional Input for Transaction Day */}
          <div>
            {recurringData.frequency === "WEEKLY" && (
              <>
                <label
                  htmlFor="transactOn"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  On Day
                </label>
                <select
                  id="transactOn"
                  name="transactOn"
                  value={recurringData.transactOn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Select Day</option>
                  {daysOfWeek.map((day, index) => (
                    <option key={day} value={index + 1}>
                      {day}
                    </option>
                  ))}
                </select>
              </>
            )}

            {(recurringData.frequency === "MONTHLY" ||
              recurringData.frequency === "YEARLY") && (
              <>
                <label
                  htmlFor="transactOn"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  On Day of Month
                </label>
                <input
                  id="transactOn"
                  name="transactOn"
                  type="number"
                  value={recurringData.transactOn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="1-31"
                  min="1"
                  max="31"
                />
              </>
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
            value={recurringData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        {/* Date Input */}
        <div className="flex flex-row justify-between">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={recurringData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Date
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={recurringData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
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

export default RecurringForm;
