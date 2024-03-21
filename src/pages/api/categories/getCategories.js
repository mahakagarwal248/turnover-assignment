/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prisma from "~/helpers/prisma";

const getCategoriesHandler = async (
  /** @type {{ query: { page: number; limit: number}; }} */ req,
  /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: number; data?: { id: number; name: string; createdAt: Date; }[]; message?: any; }): object; new (): any; }; }; }} */ res,
) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const categoryData = await prisma.categories.findMany({
      skip: Number((page - 1) * limit),
      take: Number(limit),
    });
    return res.status(200).json({ status: 200, data: categoryData });
  } catch (error) {
    console.error("Error in fetching categories:", error);
    const errorMessage = error.message || "Internal server error";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

export default getCategoriesHandler;
