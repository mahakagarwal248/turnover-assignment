/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { register, sendOtp } from "~/utils/api";

function Register() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
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
    if (
      userData.name === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      toast.error("Please fill all the fields");
    } else if (!emailPattern.test(userData.email)) {
      toast.error("Please enter a valid email address");
    } else if (userData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
    } else {
      const data = await register(userData);
      if (data.status === 200) {
        toast.info("Please verify your email address");
        await sendOtp({ email: userData.email });
        void router.push({
          pathname: "/verify-otp",
          query: { from: "redirect" }, // Example: Passing a query parameter
        });
      }
    }
  };
  return (
    <div className="m-auto mt-6 w-4/5 rounded-2xl border-2 border-gray-200 text-center md:w-1/2 lg:w-2/6">
      <p className="my-6 text-3xl font-bold">Create your account</p>
      <div className="m-auto w-3/4 text-left">
        <label className="text-md font-semibold">Name</label>
        <br />
        <input
          className="mb-5 h-11 w-full rounded-md border-2 border-gray-200 p-2"
          placeholder="Enter Name"
          type="text"
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <label className="text-md font-semibold">Email</label>
        <br />
        <input
          className="mb-5 h-11 w-full rounded-md border-2 border-gray-200 p-2"
          placeholder="Enter Email"
          type="email"
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        <label className="text-md font-semibold">Password</label>
        <br />
        <input
          className="relative h-11 w-full rounded-md border-2 border-gray-200 p-2"
          placeholder="Enter Password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />
        <button
          className="absolute translate-x-[-125%] translate-y-[30%] underline"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
        {userData.password.length >= 1 && userData.password.length < 6 && (
          <p className="text-sm text-red-500">
            Password must be at least 6 characters
          </p>
        )}
        <button
          className="my-5 mt-10 h-11 w-full rounded-md bg-black text-white"
          onClick={handleSubmit}
        >
          Create Account
        </button>
        <p className="my-5 mb-5 w-full text-center">
          Have an account?{" "}
          <button
            className="font-semibold"
            onClick={() => router.push("/login")}
          >
            LOGIN
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
