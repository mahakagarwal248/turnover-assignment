/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import prisma from "~/helpers/prisma";

const verifyOtpHandler = async (
  /** @type {{ query: { email: string; otp: string }; }} */ req,
  /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: number; message: string; }): object; new (): object; }; }; }} */ res,
) => {
  try {
    const { email, otp } = req.query;
    const existingOtpDoc = await prisma.otpVerification.findUnique({
      where: {
        email,
      },
    });
    if (existingOtpDoc?.noOfInvalidAttempts >= 3)
      return res.status(400).json({
        status: 400,
        message:
          "You have exceeded the maximum number of retries. Try again after sometime.",
      });
    if (existingOtpDoc) {
      if (existingOtpDoc.otp !== otp) {
        await prisma.otpVerification.update({
          where: { email }, // Specify the user ID to update
          data: {
            noOfInvalidAttempts: {
              increment: 1,
            },
          },
        });
        return res.status(400).json({ status: 400, message: "Invalid Otp!" });
      } else {
        await prisma.otpVerification.delete({
          where: {
            email,
          },
        });
        return res
          .status(200)
          .json({ status: 200, message: "Otp verified successfully!" });
      }
    } else {
      return res.status(404).json({
        status: 404,
        message: "Invalid request. Please resend the otp.",
      });
    }
  } catch (error) {
    console.error("Error in verifying otp:", error);
    const errorMessage = error.message || "Internal server error";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

export default verifyOtpHandler;
