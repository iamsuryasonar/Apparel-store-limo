import "./App.css";
import { lazy, Suspense } from 'react'
import { Routes, Route } from "react-router-dom";

import PublicRoute from "./components/auth_guards/public_route";
import PrivateRoute from "./components/auth_guards/private_route";
import NavAndOutlet from "./components/NavAndOutlet";
import LoadingComponent from './components/fallback/LoadingComponent'
import HomePage from "./pages/home/HomePage"
import ProductPage from './pages/products/ProductPage';

const LogInPage = lazy(() => import("./pages/LogInPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ProductsByTagPage = lazy(() => import("./pages/products/ProductsByTagPage"));
const ProductsByCategoryPage = lazy(() => import("./pages/products/ProductsByCategoryPage"));
const ShopPage = lazy(() => import("./pages/products/ShopPage"));
const AccountPage = lazy(() => import("./pages/account/AccountPage"));
const CheckOutPage = lazy(() => import("./pages/CheckOutPage"));
const OrderPlacedPage = lazy(() => import("./pages/OrderPlacedPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const TermsAndConditionsPage = lazy(() => import("./pages/TermsAndConditionsPage"));
const NoPage = lazy(() => import("./pages/NoPage"));

function App() {
  return (
    <Routes>
      <Route element={<NavAndOutlet />}>
        <Route path="/sign-in" element={
          <PublicRoute>
            <Suspense fallback={<LoadingComponent />}>
              <LogInPage />
            </Suspense>
          </PublicRoute>} />

        <Route path="/sign-up" element={
          <PublicRoute>
            <Suspense fallback={<LoadingComponent />}>
              <RegisterPage />
            </Suspense>
          </PublicRoute>} />

        <Route path="/contact-us" element={
          <Suspense fallback={<LoadingComponent />}>
            <ContactPage />
          </Suspense>} />

        <Route path="/terms-and-conditions" element={
          <Suspense fallback={<LoadingComponent />}>
            <TermsAndConditionsPage />
          </Suspense>} />

        <Route path="/products/tag/:tag" element={
          <Suspense fallback={
            <LoadingComponent />}>
            <ProductsByTagPage />
          </Suspense>} />

        <Route path="/shop" element={
          <Suspense fallback={
            <LoadingComponent />}>
            <ShopPage />
          </Suspense>} />

        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/account" element={
          <PrivateRoute>
            <Suspense fallback={<LoadingComponent />}>
              <AccountPage />
            </Suspense>
          </PrivateRoute>
        }></Route>

        <Route path='/check-out' element={<PrivateRoute>
          <Suspense fallback={<LoadingComponent />}>
            <CheckOutPage />
          </Suspense>
        </PrivateRoute>}></Route>

        <Route path='/order-placed' element={
          <PrivateRoute>
            <Suspense fallback={<LoadingComponent />}>
              <OrderPlacedPage />
            </Suspense>
          </PrivateRoute>}>
        </Route>

        <Route path="/" element={<HomePage />} />

        <Route path="/products/category/:id" element={
          <Suspense fallback={
            <LoadingComponent />}><ProductsByCategoryPage />
          </Suspense>} />
      </Route>

      <Route path='*' element={
        <Suspense fallback={
          <LoadingComponent />}>
          <NoPage />
        </Suspense>}>
      </Route>

    </Routes >
  );
}

export default App;
