import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // Token expiry in 24 hours
        const userData = { ...data.data, tokenExpiry };
        localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
        navigate("/dashboard");
      } else {
        setErrorMessage(data.message || "Invalid credentials.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const redirectToUserSubmission = () => {
    navigate("/user-submission"); // Redirect to the user submission page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Admin Login
        </h1>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Not an admin?{" "}
            <span
              onClick={redirectToUserSubmission}
              className="text-blue-500 font-medium cursor-pointer hover:underline"
            >
              Go to User Submission
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
