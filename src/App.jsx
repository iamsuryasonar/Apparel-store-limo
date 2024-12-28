import { lazy, Suspense } from 'react'
import { Routes, Route } from "react-router-dom";
import PublicRoute from "./components/auth_guards/public_route";
import PrivateRoute from "./components/auth_guards/private_route";
import NavAndOutlet from "./components/NavAndOutlet";
import LoadingComponent from './components/fallback/LoadingComponent'
const NoPage = lazy(() => import("./pages/NoPage"));
import { noAuthRoutes, privateRoutes, publicRoutes } from './routes';

function App() {

  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route element={<NavAndOutlet />}>
            {
              noAuthRoutes.map((route) => {
                return <Route key={route.path} path={route.path} element={<PublicRoute>{route.element}</PublicRoute>} ></Route>
              })
            }
            {
              privateRoutes.map((route) => {
                return <Route key={route.path} path={route.path} element={<PrivateRoute>{route.element}</PrivateRoute>} ></Route>
              })
            }
            {
              publicRoutes.map((route) => {
                return <Route key={route.path} path={route.path} element={route.element} ></Route>
              })
            }
          </Route >
          <Route path='*' element={<NoPage />} />
        </Routes >
      </Suspense >
    </>
  );
}

export default App;
