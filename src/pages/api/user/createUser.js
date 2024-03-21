/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prisma from "~/helpers/prisma";
import brcypt from "bcryptjs";

const createUserHandler = async (
  /** @type {{ body: { name: string; email: string; password: string; }; }} */ req,
  /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: number; data?: { id: number; name: string; email: string; password: string; createdAt: Date; }; message?: string; }): object; new (): any; }; }; }} */ res,
) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser)
      return res
        .status(200)
        .json({ status: 404, message: "User Already exists!" });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hashedPassword = await brcypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return res.status(201).json({ status: 200, data: newUser });
  } catch (error) {
    console.error("Error in creating user:", error);
    const errorMessage = error.message || "Failed to register";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

export default createUserHandler;
