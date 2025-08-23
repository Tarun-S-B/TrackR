const TransactionEntry = ({transaction, index, type}) => {
  const tx = transaction || {};

  const formattedDate = tx.date ? new Date(tx.date).toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
  const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(tx.amount || 0);


  return (
        <div className={`flex w-full max-w-[800px] justify-between items-center p-4 rounded-2xl shadow-md transition-transform hover:scale-[1.01] 
                ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
           <div>
            <div className="flex items-center space-x-3 font-medium">
              <span className="font-bold capitalize">{tx.category || 'Category'}</span>
              <span>{tx.description || '-'}</span>
              {/* <p>{tx.date.split('T')[0]}</p> */}
            </div>
            <div className={`font-bold text-lg ${type == 'EXPENSE' ? "text-red-500" : "text-green-500" }`}>
              {formattedAmount}
            </div>
           </div>
        </div>
    )
}

export default TransactionEntry;