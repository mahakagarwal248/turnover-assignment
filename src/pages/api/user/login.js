/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prisma from "~/helpers/prisma";
import bcrypt from "bcryptjs";

const loginHandler = async (
  /** @type {{ body: { email: string; password: string; }; }} */ req,
  /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: number; data?: { id: number; name: string; email: string; password: string; createdAt: Date; }; message?: string; }): object; new (): any; }; }; }} */ res,
) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser)
      return res
        .status(200)
        .json({ status: 404, message: "Email doesn't exist" });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const isPasswordCrt = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCrt)
      return res
        .status(200)
        .json({ status: 400, message: "Invalid credentials" });
    return res.status(201).json({ status: 200, data: existingUser });
  } catch (error) {
    console.error("Error in logging in user:", error);
    const errorMessage = error.message || "Internal server error";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

export default loginHandler;
