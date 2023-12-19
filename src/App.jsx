import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import NavAndOutlet from './components/NavAndOutlet'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route element={<NavAndOutlet />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

export default App
