import './App.css'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import RegisterPage from './pages/RegisterPage'
import ContactPage from './pages/ContactPage'
import NavAndOutlet from './components/NavAndOutlet'
import { Routes, Route } from 'react-router-dom'
import ShopPage from './pages/ShopPage'
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
      <Route>

      </Route>
    </Routes>
  )
}

export default App
