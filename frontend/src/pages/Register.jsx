import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../hooks/Toast";
import { Select, SelectItem } from "@nextui-org/select";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [genre, setGenre] = useState([]);
  const [otp, setOtp] = useState("");
  const [sentOTP, setSentOTP] = useState();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const showToast = useToast();
  const navigate = useNavigate();

  const skills = [
    { key: "DSA", label: "DSA" },
    { key: "OS", label: "OS" },
    { key: "CN", label: "CN" },
    { key: "SD", label: "SD" },
    { key: "DBMS", label: "DBMS" },
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleGenreChange = (selectedItems) => {
    setGenre(selectedItems.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      showToast("error", "Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      showToast("error", "Passwords do not match");
      return;
    }
    showToast("success", "OTP sent successfully");
    setSentOTP(123456);
    setIsOtpSent(true);
  };

  const handleResendOtp = () => {
    console.log(123456);
    // resend OTP logic
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp === sentOTP.toString()) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              email,
              mobile,
              password,
              genre,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          showToast("success", "Registration complete!");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setOtp("");
          setIsOtpSent(false);
          navigate("/login");
        } else {
          showToast(
            "error",
            data.message || "Registration failed. Please try again."
          );
        }
      } catch (error) {
        console.error("Error during registration:", error);
        showToast("error", "An error occurred. Please try again.");
      }
    } else {
      showToast("error", "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full lg:w-1/2 bg-teal-500 text-white flex flex-col justify-between p-8">
        <div className="text-4xl font-bold">ByteCorner</div>
        <div className="mt-auto">
          <h1 className="text-xl">“Connect, Book and Learn.”</h1>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6">
          <h2 className="text-center text-3xl font-bold">
            {isOtpSent ? "Verify OTP" : "Create an account"}
          </h2>

          <form
            onSubmit={isOtpSent ? handleVerifyOtp : handleRegister}
            className="space-y-4"
          >
            {!isOtpSent && (
              <>
                <Link
                  to="/login"
                  className="absolute top-0 right-0 m-4 text-black hover:underline"
                >
                  Login
                </Link>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label htmlFor="username" className="text-sm pl-2">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="rounded-xl w-full px-3 py-1.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label htmlFor="email" className="text-sm pl-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-xl w-full px-3 py-1.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label htmlFor="password" className="text-sm pl-2">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="rounded-xl w-full px-3 py-1.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm pl-2">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="rounded-xl w-full px-3 py-1.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="mobile" className="text-sm pl-2">
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    className="rounded-xl w-full px-3 py-1.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your mobile number"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-sm pl-2">Skills you are interested</div>
                  <Select
                    required
                    value={genre}
                    aria-label="skills"
                    placeholder="Select multiple"
                    selectionMode="multiple"
                    className="rounded-xl w-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onChange={handleGenreChange}
                  >
                    {skills.map((skill, index) => (
                      <SelectItem key={index} value={skill.key}>
                        {skill.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </>
            )}

            {isOtpSent && (
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm pl-2">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="rounded-xl w-full px-3 py-1.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter the OTP sent to your email"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-teal-500 text-white font-medium py-2 rounded-xl hover:bg-teal-600"
            >
              {isOtpSent ? "Verify OTP" : "Register"}
            </button>
          </form>

          {isOtpSent && (
            <button
              onClick={handleResendOtp}
              className="mt-4 w-full text-black border border-gray-300 font-medium py-2 rounded-xl hover:bg-gray-100"
            >
              Resend OTP
            </button>
          )}

          {!isOtpSent && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
