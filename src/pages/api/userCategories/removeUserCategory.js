/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prisma from "~/helpers/prisma";

const removerUserCategoriesHandler = async (
  /** @type {{ query: { categoryId: number; email: string}; }} */ req,
  /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: number; data?: object[]; message?: any; }): object; new (): any; }; }; }} */ res,
) => {
  try {
    const { email, categoryId } = req.query;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    await prisma.userCategories.delete({
      where: {
        unique_user_category: {
          userId: existingUser.id, // Filter based on the user's ID
          categoryId: Number(categoryId), // Filter based on the category ID
        }, // Filter based on the category ID
      },
    });
    return res
      .status(200)
      .json({ status: 200, message: "Category data deleted successfully!" });
  } catch (error) {
    console.error("Error in fetching user categories:", error);
    const errorMessage = error.message || "Internal server error";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

export default removerUserCategoriesHandler;
