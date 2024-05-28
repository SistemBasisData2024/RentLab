import React from "react";
import CreateBarangForm from "./components/CreateBarangForm";
import LoanList from "./components/LoanList";
import Dashboard from "./components/Dashboard";
import LoginUser from "./components/LoginUser";
import LoginAslab from "./components/LoginAslab";
import SignUpUser from "./components/SignUpUser";
import SignUpAslab from "./components/SignUpAslab";

function App() {
  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    //   <CreateBarangForm />
    // </div>
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl font-bold mb-4">List Pinjaman</h1>
    //   <LoanList labId={1} />
    // </div>
    // <div className="App">
    //   <Dashboard />
    // </div>
    // <div className="App">
    //   <LoginAslab />
    // </div>
    // <div className="App">
    //   <SignUpAslab />
    // </div>
    <Dashboard />
  );
}

export default App;
