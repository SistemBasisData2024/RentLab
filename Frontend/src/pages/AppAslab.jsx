import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom"
import NavbarAslab from "../components/default-comp/NavbarAslab";

function AppAslab() {

  return (
    <div className="pt-10">
      <ScrollRestoration />

      <NavbarAslab />
      
      < Outlet />    
    </div>
  );
}

export default AppAslab;
