import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Market from "../pages/Market";
import Portfolio from "../pages/Portfolio";
import Alerts from "../pages/Alerts";
import ErrorBoundary from "../components/ErrorBoundary";
import { marketLoader } from "./loaders";
import NotFound from "../pages/NotFound";
import RootLayout from "../layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: (
      <ErrorBoundary>
        <MainLayout />
      </ErrorBoundary>
    ),
    loader: marketLoader,
    shouldRevalidate: () => false,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "market", element: <Market /> },
          { path: "portfolio", element: <Portfolio /> },
          { path: "alerts", element: <Alerts /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);
