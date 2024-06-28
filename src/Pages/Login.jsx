import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      if (
        (storedUser.email === input.email || storedUser.username === input.email) &&
        storedUser.password === input.password
      ) {
        setError("");
        localStorage.setItem('currentuser', JSON.stringify(input))
        navigate("/profile")
        // console.log("Login successful");
      } else {
        setError("Invalid credentials");
      }
    } else {
      setError("No user found. Please register first.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Username or Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Create a new account
                </Link>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
