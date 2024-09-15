import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../hooks/Toast";
import { useUser } from "../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const showToast = useToast();
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("error", "Email and Password are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        if (response.status === 404) {
          showToast("error", "404 error.");
        } else {
          showToast("error", "Something went wrong");
        }
        console.error("Server Response:", message);
        return;
      }

      const data = await response.json();
      showToast("success", "Login Successful");
      login(data.token, data.userId);
      navigate("/");
    } catch (err) {
      console.error(err);
      showToast("error", "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen relative">
      <div className="w-1/2 bg-teal-500 text-white flex flex-col justify-between p-8">
        <div className="text-4xl font-bold">ByteCorner</div>
        <div className="mt-auto">
          <h1 className="text-xl">“Connect, Book and Learn.”</h1>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <Link
          to="/register"
          className="absolute top-0 right-0 m-4 text-black hover:underline"
        >
          Register
        </Link>

        <div className="flex flex-col justify-center items-center p-12 h-full">
          <div className="max-w-md w-full space-y-6">
            <h2 className="text-center text-3xl font-bold">Login</h2>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm pl-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm pl-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 text-white font-medium py-2 rounded-xl hover:bg-teal-600 disabled:bg-teal-300"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="flex items-center justify-between">
              <hr className="w-full border-gray-300" />
              <span className="mx-2 text-gray-500">OR</span>
              <hr className="w-full border-gray-300" />
            </div>

            <div className="space-y-3">
              <button className="flex items-center justify-center gap-x-3 w-full text-black border border-gray-300 font-medium py-2 rounded-xl hover:bg-gray-100">
                <FcGoogle size={24} />
                Continue with Google
              </button>
              <button className="flex items-center justify-center gap-x-3 w-full text-black border border-gray-300 font-medium py-2 rounded-xl hover:bg-gray-100">
                <FaApple size={24} />
                Continue with Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
