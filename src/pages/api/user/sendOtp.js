/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prisma from "~/helpers/prisma";
import sendEmail from "~/utils/sendEmail";

const sendOtpHandler = async (
  /** @type {{ query: { email: string; }; }} */ req,
  /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: number; message: string; }): object; new (): object; }; }; }} */ res,
) => {
  try {
    const { email } = req.query;
    const existingOtpDoc = await prisma.otpVerification.findUnique({
      where: {
        email,
      },
    });
    const otp = Math.floor(10000000 + Math.random() * 90000000).toString();
    if (existingOtpDoc) {
      if (existingOtpDoc.numberOfResends >= 3)
        return res.status(400).json({
          status: 400,
          message:
            "You have exceeded the maximum number of retries. Try again after sometime.",
        });
      const response = await sendEmail({
        to: email,
        subject: "OTP",
        text: otp,
      });
      if (response.status !== 200)
        return res.status(400).json({
          status: 400,
          message: "Error in sending OTP",
        });
      await prisma.otpVerification.update({
        where: { email },
        data: {
          numberOfResends: {
            increment: 1,
          },
          otp,
        },
      });
    } else {
      const response = await sendEmail({
        to: email,
        subject: "OTP",
        text: otp,
      });
      if (response.status !== 200)
        return res.status(400).json({
          status: 400,
          message: "Error in sending OTP",
        });
      await prisma.otpVerification.create({
        data: {
          email,
          otp,
          numberOfResends: 0,
          noOfInvalidAttempts: 0,
        },
      });
    }
    return res
      .status(201)
      .json({ status: 200, message: "Otp sent successfully!" });
  } catch (error) {
    console.error("Error in sending otp:", error);
    const errorMessage = error.message || "Internal server error";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

export default sendOtpHandler;
