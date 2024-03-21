/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { verifyOtp } from "~/utils/api";
import maskEmail from "~/utils/dataMasking";

function OtpVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const userEmail = JSON.parse(userData).email;
        setEmail(userEmail);
      }
    }
  }, []);

  const handleInputChange = (
    /** @type {number} */ field,
    /** @type {string} */ value,
  ) => {
    setOtp({ ...otp, [field]: value });
  };

  const handleSubmit = async (
    /** @type {{ preventDefault: () => void; }} */ e,
  ) => {
    const finalOtp = Object.values(otp).join("");
    e.preventDefault();
    if (finalOtp === "") {
      toast.error("Please fill all the fields");
    } else if (finalOtp.length !== 8) {
      toast.error("Please enter 8 digit code");
    } else {
      const finalOtp = Object.values(otp).join("");
      const data = await verifyOtp({ email, otp: finalOtp });
      if (data.status === 200) {
        toast.success("Email Verified successfully");
        void router.push("/login");
      }
    }
  };

  const inputHandler = (/** @type {any} */ event) => {
    setTimeout(() => {
      if (
        event.code === "Backspace" &&
        event.target.value === "" &&
        event.target.previousSibling
      ) {
        event.target.previousSibling.focus();
      }
      if (event.code === "ArrowRight" && event.target.nextSibling) {
        event.target.nextSibling.focus();
      }
      if (event.code === "ArrowLeft" && event.target.previousSibling) {
        event.target.previousSibling.focus();
      }
      if (event.target.value !== "" && event.target.nextSibling) {
        event.target.nextSibling.focus();
      }
    }, 10);
  };

  const handlePaste = (
    /** @type {{ clipboardData: { getData: (arg0: string) => any; }; target: { nextSibling: { nextSibling: { nextSibling: { focus: () => void; }; }; }; }; }} */ event,
  ) => {
    const pastedData = event.clipboardData.getData("Text");
    const otpArray = pastedData.split("").slice(0, 8);

    setOtp({
      1: otpArray[0] || "",
      2: otpArray[1] || "",
      3: otpArray[2] || "",
      4: otpArray[3] || "",
      5: otpArray[4] || "",
      6: otpArray[5] || "",
      7: otpArray[6] || "",
      8: otpArray[7] || "",
    });

    setTimeout(() => {
      event.target.nextSibling.nextSibling.nextSibling.focus();
    }, 0);
  };
  const inputBoxes = Array.from({ length: 8 }, (_, index) => index + 1);

  return (
    <div className="m-auto mt-6 w-4/5 rounded-2xl border-2 border-gray-200 text-center md:w-1/2 lg:w-2/5">
      <p className="my-6 text-3xl font-bold">Verify your email</p>
      <div className="m-auto flex w-3/4 flex-col justify-evenly text-left">
        <p className="m-auto my-8  text-center">
          Enter 8 digit code you have recieved on <br /> {maskEmail(email)}
        </p>
        <p className="ml-2">Code</p>
        <div className="mb-7 flex flex-row justify-evenly">
          {inputBoxes.map((i) => (
            <input
              key={i}
              className="mx-1 lg:mx-2 mb-5 h-11 w-full rounded-md border-2 border-gray-200 p-1 text-center"
              onChange={(e) => handleInputChange(i, e.target.value)}
              maxLength={1}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              onPaste={handlePaste}
              onKeyDown={(event) => inputHandler(event)}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              value={otp[i]}
            />
          ))}
        </div>
        <button
          className="mb-10 mt-5 h-11 w-full rounded-md bg-black text-white"
          onClick={handleSubmit}
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default OtpVerification;
