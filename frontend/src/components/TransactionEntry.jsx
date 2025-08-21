const TransactionEntry = () => {
    const index = 12
    const tx = {
        id: 1,
        category: "Investment",
        description: "Invested in mutual funds",
        date: "2023-10-01",
        amount: -5000
    };
    return (
        <>
            <div
            key={tx.id}
            className={`flex w-[800px] justify-between items-center p-4 rounded-2xl shadow-md transition-transform hover:scale-[1.01] 
                ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`
        }
          >
            {/* Left side: icon + description */}
            <div>
              <div className="flex items-center space-x-2 font-medium">
                <span>{tx.category}</span>
                <span>{tx.description}</span>
              </div>
              <p className="text-xs text-gray-500">{tx.date}</p>
            </div>

            {/* Right side: amount */}
            <div
              className={`font-bold ${
                tx.amount > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
            </div>
          </div>
        </>
    )
}

export default TransactionEntry;