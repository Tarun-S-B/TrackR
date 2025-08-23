import { useState } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'

import HeaderBar from './components/HeaderBar.jsx'
import Navbar from './components/Navbar.jsx'

import Home from './pages/Home.jsx'
import ExpensePage from './pages/ExpensePage.jsx'
import EarningsPage from './pages/EarningsPage.jsx'
import RecurringPage from './pages/RecurringPage.jsx'

import AddButton from './utils/AddButton.jsx'


function App() {
  return (
    <>
      <HeaderBar />
      <Navbar />
      <div className='main-container mt-30 ml-100'>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/expenses" element={<ExpensePage /> } />
          <Route path="/earnings" element={<EarningsPage />} />
          <Route path="/recurring" element={<RecurringPage />} />
        </Routes>
      </div>
      <AddButton />
    </>
  )
}

export default App
