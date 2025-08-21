import { useState } from "react";
import { X, ArrowDown, ArrowUp, PiggyBank, Repeat } from "lucide-react";


const PlusButton = ({setShowExpenseForm, setShowInvestmentForm, setShowIncomeForm, setShowRecurringForm}) => {
  const [clicked, setClicked] = useState(false);

  const openExpenseForm = () => {
    alert("Open Expense Form");
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <div className="flex flex-col items-center space-y-2">

        {clicked && ( 
            <>
            {/* // New Expense Button */}
            <button title="Add Expense" onClick={() => {setShowExpenseForm(true); setClicked(false);}}
            className="position-relative bottom-20 right-10 bg-red-600 rounded-full p-4"
            >
                <ArrowDown />
            </button>

            {/* New investment button */}
            <button title="Add Investment" onClick={() => {setShowInvestmentForm(true); setClicked(false);}}
            className="position-relative bottom-20 right-10 bg-green-600 rounded-full p-4"
            >
                <ArrowUp />
            </button>

            {/* New income button */}
            <button title="Add Income" onClick={() => {setShowIncomeForm(true); setClicked(false);}}
            className="position-relative bottom-20 right-10 bg-sky-300 rounded-full p-4"
            >
                <PiggyBank />
            </button>

            {/* New income button */}
            <button title="Add Recurring Payment" onClick={() => {setShowRecurringForm(true); setClicked(false);}}
            className="position-relative bottom-20 right-10 border rounded-full p-4"
            >
                <Repeat />
            </button>

            </>
        )}
        <button
          onClick={() => {
            setClicked((clicked) => !clicked);
          }}
          className="plus-button 
        
        rounded-full 
        bg-blue-500 
        text-white text-4xl
        h-16 w-16  
        hover:bg-blue-600 transition-colors"
        >
          {clicked ? <X/> : "+" }
        </button>
      </div>
    </div>
  );
};
export default PlusButton;
