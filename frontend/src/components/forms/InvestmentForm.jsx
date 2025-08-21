import { useState } from "react";
import { X } from "lucide-react";
import { postToBackend } from "../../apiService";

const InvestmentForm = ({ setShowInvestmentForm }) => {
  const [investmentdata, setInvestmentData] = useState({
    amount: "",
    account: "",
    description: "",
    investmentDate: new Date().toISOString().split("T")[0],
    investmentType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvestmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowInvestmentForm(false);

    try {
      const result = await postToBackend("/api/newinvestment", investmentdata);
      console.log("backend response:", result);
    } catch (error) {
      console.error("Error sending income data to backend:", error);
    }
  };

  const handleClose = () => {
    setShowInvestmentForm(false);
  };
  return (
    // Use a div with a flexbox column layout for clean spacing.
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">New Investment</h2>
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
            htmlFor="investment-amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <input
            id="investment-amount"
            name="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={investmentdata.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Category Radio Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {["Stock", "Mutual Fund", "Real Estate", "Gold", "FD", "Other"].map(
              (type) => (
                <label
                  key={type}
                  htmlFor={`investment-${type}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    id={`investment-${type}`}
                    type="radio"
                    name="investmentType"
                    value={type.toLowerCase().replace(" ", "-")} // e.g., 'mutual-fund'
                    checked={
                      investmentdata.investmentType ===
                      type.toLowerCase().replace(" ", "-")
                    }
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    required
                  />
                  <span className="text-gray-700">{type}</span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Description Textarea */}
        <div>
          <label
            htmlFor="investment-description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="investment-description"
            name="description"
            placeholder="e.g., 10 shares of AAPL"
            value={investmentdata.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
          />
        </div>

        {/* Date Input */}
        <div>
          <label
            htmlFor="investmentDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            id="investmentDate"
            name="investmentDate"
            type="date"
            value={investmentdata.investmentDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Add Investment
          </button>
        </div>
      </form>
    </div>
  );
  // return (
  //     <>
  //         <form onSubmit={handleSubmit}>

  //             <input
  //                 name="amount"
  //                 type="number"
  //                 step="0.01"
  //                 placeholder="Investment Amount"
  //                 value={investmentdata.amount}
  //                 onChange={handleChange}
  //                 required
  //             />
  //             <br/>

  //             {['Savings', 'Stock', 'Mutual Fund', 'Real Estate', 'Gold', 'FD', 'Other'].map(type => (
  //                 <label key={type}>
  //                     <input
  //                         name="investmentType"
  //                         type="radio"
  //                         value={type}
  //                         checked={investmentdata.investmentType === type}
  //                         onChange={handleChange}
  //                         required
  //                     />
  //                     {type.charAt(0).toUpperCase() + type.slice(1)}
  //                 </label>
  //             ))}

  //             <br />

  //             <textarea
  //                 name="description"
  //                 placeholder="Investment Description"
  //                 value={investmentdata.description}
  //                 onChange={handleChange}
  //             />

  //             <br/>
  //             <input
  //                 name="investmentDate"
  //                 type="date"
  //                 value={investmentdata.investmentDate}
  //                 onChange={handleChange}
  //                 required
  //             />

  //             <br/>
  //             <input
  //                 name="account"
  //                 type="text"
  //                 placeholder="To be filled later with accounts"
  //                 value={investmentdata.account}
  //                 onChange={handleChange}
  //             />
  //             <br/>

  //             <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
  //                 Submit
  //             </button>
  //         </form>
  //     </>
  // )
};

export default InvestmentForm;
