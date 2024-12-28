import { lazy, Suspense } from 'react'

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
const HomePage = lazy(() => import("./pages/home/HomePage"));
const ProductPage = lazy(() => import("./pages/products/ProductPage"));

export const noAuthRoutes = [
    {
        path: '/sign-in',
        element: <LogInPage />
    },
    {
        path: '/sign-up',
        element: <RegisterPage />
    },
]

export const publicRoutes = [
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/contact-us',
        element: <ContactPage />
    },
    {
        path: '/terms-and-conditions',
        element: <TermsAndConditionsPage />
    },
    {
        path: '/products/tag/:tag',
        element: <ProductsByTagPage />
    },
    {
        path: '/product/:id',
        element: <ProductPage />
    },
    {
        path: '/shop',
        element: <ShopPage />
    },
    {
        path: '/products/category/:id',
        element: <ProductsByCategoryPage />
    }
]

export const privateRoutes = [
    {
        path: "/account",
        element: <AccountPage />
    },
    {
        path: '/check-out',
        element: <CheckOutPage />
    },
    {
        path: "/order-placed",
        element: <OrderPlacedPage />
    },
]