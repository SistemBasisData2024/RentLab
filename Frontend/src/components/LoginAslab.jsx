import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoginStatus } from "./loginStatus/loginStatus";

const LoginAslab = () => {
  const [npm, setNpm] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // login status variable
  const { accountLogged, setAccountLogged } = useLoginStatus();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8463/aslab/login", {
        npm,
        password,
      });
      if (response.data) {
        setAccountLogged(true)
        navigate("/aslab/dashboard", { state: { npm: npm } });
      } else {
        setMessage("Login failed. Please check your NPM and password.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Internal Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: "#90AEAD" }}>
      <div className="p-8 rounded shadow-md w-full max-w-md flex flex-col justify-center" style={{ backgroundColor: "#FBE9D0" }}>
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#244855" }}>Login Aslab</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="npm" style={{ color: "#874F41" }}>
              NPM
            </label>
            <input type="text" id="npm" className="w-full p-2 border-2 rounded" style={{ borderColor: "#E64833", color: "#244855" }} value={npm} onChange={(e) => setNpm(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="block mb-2" htmlFor="password" style={{ color: "#874F41" }}>
              Password
            </label>
            <input type="password" id="password" className="w-full p-2 border-2 rounded" style={{ borderColor: "#E64833", color: "#244855" }} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {message && <p className="mb-4 text-center" style={{ color: "#874F41" }}>{message}</p>}
          <button type="submit" className="w-full py-2 rounded hover:bg-blue-600" style={{ backgroundColor: "#244855", color: "#FBE9D0" }}>
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/aslab/signup" className="text-sm duration-150 hover:text-gray-500" style={{ color: "#E64833" }}>Are you a new Laboratory Assistant?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginAslab;
