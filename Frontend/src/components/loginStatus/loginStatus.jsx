import { useState } from 'react';

// Custom hook untuk mengelola login state
export const useLoginStatus = () => {
  const [accountLogged, setAccountLogged] = useState({
    npm: "",
    isAslab: false,
    logged: false
    });
    
  return { accountLogged, setAccountLogged };
};