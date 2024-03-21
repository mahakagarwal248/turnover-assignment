/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prisma from "~/helpers/prisma";

const addUserCategoryHandler = async (
  /** @type {{ query: { email: string; categoryId: number}; }} */ req,
  /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: number; data?: object; message?: any; }): object; new (): any; }; }; }} */ res,
) => {
  try {
    const { email, categoryId } = req.query;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    const userId = existingUser.id;
    const savedCategory = await prisma.userCategories.create({
      data: {
        userId: userId,
        categoryId: Number(categoryId),
      },
    });
    return res.status(200).json({ status: 200, data: savedCategory });
  } catch (error) {
    console.error("Error in saving selected categories:", error);
    const errorMessage = error.message || "Internal server error";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

// Example usage:
export default addUserCategoryHandler;
