import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/CartItem/ShopContext";
import Cookie from "js-cookie";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setCurrentUser } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookie.get("token");
    const isAdmin = Cookie.get("isAdmin");
    if (token) {
      if (isAdmin === "true") {
        navigate("/adminhome");
      } else {
        navigate("/profile");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://babyshop-backend.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (response.ok) {
        Cookie.set("token", data.token);

        if (data.user.isAdmin) {
          Cookie.set("isAdmin", "true");
          navigate("/dashboard");
        } else {
          Cookie.remove("isAdmin");
          navigate("/profile");
        }

        Cookie.set("currentUser", JSON.stringify(data.user));
        setCurrentUser(data.user);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="w-full max-w-md p-8 sm:p-12 bg-white shadow-md rounded-lg">
        <div>
          <h1 className="text-2xl font-bold text-center mb-6">
            Little<span className="text-pink-500">Love</span>
          </h1>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <div className="my-6 border-b text-center w-full">
            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
              Sign in with your email
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto max-w-xs w-full">
            <input
              className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <button
              type="submit"
              className="mt-4 tracking-wide font-semibold bg-green-400 text-white w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <svg
                className="w-5 h-5 -ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-2">Sign In</span>
            </button>
            <p className="mt-6 text-xs text-gray-600 text-center">
              I agree to abide by Cartesian Kinetics{" "}
              <a href="#" className="border-b border-gray-500 border-dotted">
                Terms of Service
              </a>{" "}
              and its{" "}
              <a href="#" className="border-b border-gray-500 border-dotted">
                Privacy Policy
              </a>
            </p>
          </form>
          <p className="mt-6 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
