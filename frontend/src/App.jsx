import { useState } from 'react'
import './index.css'
import Home from './pages/Home.jsx'
import PlusButton from './utils/PlusButton.jsx'
import ExpenseForm from './components/forms/ExpenseForm.jsx'
import InvestmentForm from './components/forms/InvestmentForm.jsx'
import IncomeForm from './components/forms/IncomeForm.jsx'
import FormLayer from './components/FormLayer.jsx'
import HeaderBar from './components/HeaderBar.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  const [ showExpenseForm, setShowExpenseForm ] = useState(false)
  const [ showInvestmentForm, setShowInvestmentForm ] = useState(false)
  const [ showIncomeForm, setShowIncomeForm ] = useState(false)
  const [ showRecurringForm, setShowRecurringForm ] = useState(false)

  return (
    <>
      <HeaderBar />
      <Navbar />
      <div className='main-container mt-30 ml-60'>

        <Home />

      </div>
      <PlusButton 
        setShowExpenseForm={setShowExpenseForm} 
        setShowInvestmentForm={setShowInvestmentForm} 
        setShowIncomeForm={setShowIncomeForm}
        setShowRecurringForm={setShowRecurringForm}
      />
      
      { showExpenseForm && 
        <FormLayer showForm={setShowExpenseForm}>
          <ExpenseForm setShowExpenseForm={setShowExpenseForm} />
        </FormLayer>
       }
      { showInvestmentForm && 
        <FormLayer showForm={setShowInvestmentForm}>
          <InvestmentForm setShowInvestmentForm={setShowInvestmentForm} /> 
        </FormLayer>
      }
      { showIncomeForm && 
        <FormLayer showForm={setShowIncomeForm}>
          <IncomeForm setShowIncomeForm={setShowIncomeForm} />
        </FormLayer>
      }
      { showRecurringForm && 
        <FormLayer showForm={setShowRecurringForm}>
          {/* Recurring Form Component can be added here */}
        </FormLayer>
      }
      
      
       
    </>
  )
}

export default App
