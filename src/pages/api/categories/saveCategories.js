/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import prisma from "~/helpers/prisma";

import { faker } from "@faker-js/faker";
const saveCategoriesHandler = async (
  /** @type {{ body: { name: any; email: any; password: any; }; }} */ req,
  /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status?: number; message?: string; }): object; new (): any; }; }; }} */ res,
) => {
  try {
    for (var i = 0; i < 100; i++) {
      const slug = faker.lorem.slug(1);
      await prisma.categories.create({
        data: {
          name: slug,
        },
      });
    }
    return res.status(201).json({ status: 200, message: "Categories added!" });
  } catch (error) {
    console.error("Error creating user:", error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const errorMessage = error.message || "Internal server error";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

export default saveCategoriesHandler;
