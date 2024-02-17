import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import NavAndOutlet from "./components/NavAndOutlet";
import ShopPage from "./pages/products/ShopPage";
import ProductsByCategoryPage from './pages/products/ProductsByCategoryPage'
import PublicRoute from "./components/auth_guards/public_route";
import PrivateRoute from "./components/auth_guards/private_route";
import ProductPage from './pages/ProductPage'
import AccountPage from "./pages/AccountPage";

function App() {
  const userData = useSelector((state) => state.auth?.userData);

  return (
    <Routes>
      <Route element={<NavAndOutlet />}>
        <Route element={<PublicRoute userData={userData} />}>
          <Route path="/sign-in" element={<LogInPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductsByCategoryPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route element={<PrivateRoute userData={userData} />}>
          <Route path="/account" element={<AccountPage />}></Route>
        </Route>
      </Route>
      <Route></Route>
    </Routes>
  );
}

export default App;
