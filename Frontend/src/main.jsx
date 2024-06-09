import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Dashboard from "./components/Dashboard.jsx";
import LoginUser from "./components/LoginUser.jsx";
import SignUpUser from "./components/SignUpUser.jsx";
import SignUpAslab from "./components/SignUpAslab.jsx";
import LoanList from "./components/LoanList.jsx";
import HistoryLoan from "./components/HistoryLoan.jsx";
import CreateLoan from "./components/CreateLoan.jsx";
import CreateBarangForm from "./components/CreateBarangForm.jsx";
import DashboardUser from "./components/DashboardUser.jsx";
import LoginAslab from "./components/LoginAslab.jsx";
import EditBarangForm from "./components/EditBarang.jsx";
import DashboardAslab from "./components/DashboardAslab.jsx";
import LandingPage from "./components/LandingPage.jsx";
import AppUser from "./pages/AppUser.jsx";
import AppAslab from "./pages/AppAslab.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/home",
        element: <LandingPage />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
    ],
  },
  {
    element: < AppUser />,
    children: [
      {
        path: "/user/dashboard",
        element: <DashboardUser />,
      },
      {
        path: "/user/historyPinjam/:npm",
        element: <HistoryLoan />,
      },
      {
        path: "/user/createPinjam/:barangId",
        element: <CreateLoan />,
      },
    ]
  },
  {
    element: < AppUser />,
    children: [
      {
        path: "/user/dashboard",
        element: <DashboardUser />,
      },
      {
        path: "/user/historyPinjam/:npm",
        element: <HistoryLoan />,
      },
      {
        path: "/user/createPinjam/:barangId",
        element: <CreateLoan />,
      },
    ]
  },
  {
    element: < AppAslab />,
    children: [
      {
        path: "/aslab/dashboard",
        element: <DashboardAslab />,
      },
      {
        path: "/aslab/listPinjam/:labId",
        element: <LoanList />,
      },
      {
        path: "/aslab/createBarang",
        element: <CreateBarangForm />,
      },
      {
        path: "/aslab/editBarang/:id",
        element: <EditBarangForm />,
      },
    ]
  },
  {
    path: "/",
    element: <Navigate to="/home" />
  },
  {
    path: "/authentication",
    element: <Dashboard />,
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
    path: "/aslab/login",
    element: <LoginAslab />,
  },
  {
    path: "/aslab/signup",
    element: <SignUpAslab />,
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
