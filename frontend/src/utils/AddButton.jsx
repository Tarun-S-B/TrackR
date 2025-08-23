import { useState } from "react";
import PlusButton from "./PlusButton";
import FormLayer from "../components/FormLayer.jsx";
import ExpenseForm from "../components/forms/ExpenseForm.jsx";
import InvestmentForm from "../components/forms/InvestmentForm.jsx";    
import IncomeForm from "../components/forms/IncomeForm.jsx";
import RecurringForm from "../components/forms/RecurringForm.jsx";

const AddButton = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showRecurringForm, setShowRecurringForm] = useState(false);

  return (
    <>
      <PlusButton
        setShowExpenseForm={setShowExpenseForm}
        setShowInvestmentForm={setShowInvestmentForm}
        setShowIncomeForm={setShowIncomeForm}
        setShowRecurringForm={setShowRecurringForm}
      />

      {showExpenseForm && (
        <FormLayer showForm={setShowExpenseForm}>
          <ExpenseForm setShowExpenseForm={setShowExpenseForm} />
        </FormLayer>
      )}
      {showInvestmentForm && (
        <FormLayer showForm={setShowInvestmentForm}>
          <InvestmentForm setShowInvestmentForm={setShowInvestmentForm} />
        </FormLayer>
      )}
      {showIncomeForm && (
        <FormLayer showForm={setShowIncomeForm}>
          <IncomeForm setShowIncomeForm={setShowIncomeForm} />
        </FormLayer>
      )}
      {showRecurringForm && (
        <FormLayer showForm={setShowRecurringForm}>
          <RecurringForm  setShowRecurringForm={setShowRecurringForm} />
        </FormLayer>
      )}
    </>
  );
};

export default AddButton;