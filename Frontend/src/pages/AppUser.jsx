import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom"
import NavbarUser from "../components/default-comp/NavbarUser";

function AppUser() {

  return (
    <div className="pt-10">
      <ScrollRestoration />

      <NavbarUser />
      
      < Outlet />    
    </div>
  );
}

export default AppUser;
