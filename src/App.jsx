import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import NavAndOutlet from "./components/NavAndOutlet";
import ShopPage from "./pages/products/ShopPage";
import ProductsByCategoryPage from './pages/products/ProductsByCategoryPage'
import PublicRoute from "./components/auth_guards/public_route";
import PrivateRoute from "./components/auth_guards/private_route";
import ProductPage from './pages/products/ProductPage';
import AccountPage from "./pages/account/AccountPage";
import CheckOutPage from './pages/CheckOutPage'
import OrderPlacedPage from './pages/OrderPlacedPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import NoPage from "./pages/NoPage";

function App() {
  return (
    <Routes>
      <Route element={<NavAndOutlet />}>
        <Route path="/sign-in" element={<PublicRoute><LogInPage /></PublicRoute>} />
        <Route path="/sign-up" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductsByCategoryPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/account" element={<PrivateRoute><AccountPage /></PrivateRoute>}></Route>
        <Route path='/check-out' element={<PrivateRoute><CheckOutPage /> </PrivateRoute>}></Route>
        <Route path='/order-placed' element={<PrivateRoute><OrderPlacedPage /> </PrivateRoute>}></Route>
      </Route>
      <Route path='*' element={<NoPage />}></Route>
    </Routes >
  );
}

export default App;
