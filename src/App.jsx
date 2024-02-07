import "./App.css";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import NavAndOutlet from "./components/NavAndOutlet";
import { Routes, Route } from "react-router-dom";
import ShopPage from "./pages/ShopPage";

import { useSelector } from "react-redux";
import PublicRoute from "./components/auth_guards/public_route";
import PrivateRoute from "./components/auth_guards/private_route";

function App() {
  const userData = useSelector((state) => state.auth?.userData);
  console.log(userData);
  return (
    <Routes>
      <Route element={<NavAndOutlet />}>
        <Route element={<PublicRoute userData={userData} />}>
          <Route path="/sign-in" element={<LogInPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
        </Route>
        <Route element={<PrivateRoute userData={userData} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Route>
      </Route>
      <Route></Route>
    </Routes>
  );
}

export default App;
