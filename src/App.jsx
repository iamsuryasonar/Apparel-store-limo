import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import RegisterPage from './pages/RegisterPage'
import ContactPage from './pages/ContactPage'
import NavAndOutlet from './components/NavAndOutlet'
import { Routes, Route } from 'react-router-dom'
import ShopPage from './pages/shop/ShopPage'
function App() {

  return (
    <Routes>
      <Route element={<NavAndOutlet />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/contact-us' element={<ContactPage />} />
        <Route path='/sign-in' element={<LogInPage />} />
        <Route path='/sign-up' element={<RegisterPage />} />
        <Route path='/shop' element={<ShopPage />}></Route>
      </Route>
    </Routes>
  )
}

export default App
