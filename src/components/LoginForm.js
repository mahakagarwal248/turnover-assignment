/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { login } from "~/utils/api";

function LoginForm() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (
    /** @type {any} */ field,
    /** @type {any} */ value,
  ) => {
    setUserData({ ...userData, [field]: value });
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (/** @type {any} */ e) => {
    e.preventDefault();
    if (userData.email === "" || userData.password === "") {
      toast.error("Please fill all the fields");
    } else if (!emailPattern.test(userData.email)) {
      toast.error("Please enter a valid email address");
    } else if (userData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
    } else {
      const data = await login(userData);
      if (data.status === 200) {
        toast.success("Logged In successfully");
        void router.push("/");
      } else {
        toast.error(data.message);
      }
    }
  };
  return (
    <div className="m-auto mt-6 w-4/5 rounded-2xl border-2 border-gray-200 text-center md:w-1/2 lg:w-2/6">
      <p className="my-6 text-3xl font-bold">Login</p>
      <p className="my-3 text-xl font-semibold">Welocome back to ECOMMERCE</p>
      <p className="font-semobild mb-7">The next Gen business marketplace</p>
      <div className="m-auto w-3/4 text-left">
        <label className="text-md font-semibold">Email</label>
        <br />
        <input
          className="mb-5 h-11 w-full rounded-md border-2 border-gray-200 p-2"
          placeholder="Enter Email"
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        <label className="text-md font-semibold">Password</label>
        <br />
        <input
          className="relative h-11 w-full rounded-md border-2 border-gray-200 p-2"
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          onChange={(e) => handleInputChange("password", e.target.value)}
        />
        <button
          className="absolute translate-x-[-125%] translate-y-[30%] underline"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
        {userData.password.length >=1 && userData.password.length < 6 && (
          <p className="text-red-500 text-sm">Password must be at least 6 characters</p>
        )}
        <button
          className="my-5 mt-10 h-11 w-full rounded-md bg-black text-white"
          onClick={handleSubmit}
        >
          Login
        </button>
        <p className="my-5 mb-5 w-full text-center">
          Doesn't have an account?{" "}
          <button
            className="font-semibold"
            onClick={() => router.push("/register")}
          >
            SIGN UP
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
