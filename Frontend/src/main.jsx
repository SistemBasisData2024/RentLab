import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import LoginUser from "./components/LoginUser.jsx";
import SignUpUser from "./components/SignUpUser.jsx";
import SignUpAslab from "./components/SignUpAslab.jsx";
import LoanList from "./components/LoanList.jsx";
import HistoryLoan from "./components/HistoryLoan.jsx";
import CreateLoan from "./components/CreateLoan.jsx";
import CreateBarangForm from "./components/CreateBarangForm.jsx";
import DashboardUser from "./components/DashboardUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/user/dashboard",
    element: <DashboardUser />,
  },
  {
    path: "/user/login",
    element: <LoginUser />,
  },
  {
    path: "/user/signup",
    element: <SignUpUser />,
  },
  {
    path: "/user/historyPinjam/:npm",
    element: <HistoryLoan />,
  },
  {
    path: "/user/createPinjam/:barangId",
    element: <CreateLoan />,
  },
  {
    path: "/aslab/login",
    element: <LoginUser />,
  },
  {
    path: "/aslab/signup",
    element: <SignUpAslab />,
  },
  {
    path: "/aslab/listPinjam/:labId",
    element: <LoanList />,
  },
  {
    path: "/aslab/createBarang",
    element: <CreateBarangForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
