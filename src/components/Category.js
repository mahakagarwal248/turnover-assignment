/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  addUserCategory,
  removeUserCategory,
  getAllCategories,
  getUserCategory,
} from "~/utils/api";
import PaginationComp from "./Pagination";

function Category() {
  const [email, setEmail] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const updateCurrentPage = (
    /** @type {import("react").SetStateAction<number>} */ page,
  ) => {
    setCurrentPage(page);
    void getCategoryData(page);
  };
  const getCategoryData = async (
    /** @type {import("react").SetStateAction<number>} */ page,
  ) => {
    const response = await getAllCategories({ page, limit: 6 });
    setCategoryData(response.data);
  };

  const getUserCategoryData = async (/** @type {any} */ email) => {
    const response = await getUserCategory({ email });
    setUserCategories(response.data);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const userEmail = JSON.parse(userData).email;
        setEmail(userEmail);

        void getCategoryData(currentPage);
        void getUserCategoryData(userEmail);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = async (
    /** @type {import("react").ChangeEvent<HTMLInputElement>} */ e,
    /** @type {number} */ categoryId,
    isChecked,
  ) => {
    e.preventDefault();
    if (!isChecked) {
      await removeCategory(categoryId);
    } else {
      await addCategory(categoryId);
    }
  };
  const addCategory = async (categoryId) => {
    if (email !== "" && categoryId !== "") {
      const addedData = await addUserCategory({email,categoryId});
      if (addedData.status !== 200) {
        toast.error(addedData.message);
      } else {
        void getUserCategoryData(email);
      }
    }
  };
  const removeCategory = async (categoryId) => {
    if (email !== "" && categoryId !== "") {
      const addedData = await removeUserCategory({email, categoryId});
      if (addedData.status !== 200) {
        toast.error(addedData.message);
      } else {
        void getUserCategoryData(email);
      }
    }
  };
  return (
    <div className="m-auto mt-6 w-4/5 rounded-2xl border-2 border-gray-200 text-center md:w-1/2 lg:w-2/6">
      <p className="my-6 text-3xl font-bold">Please Mark your interests</p>
      <p className="my-8 text-center">We will keep you notified.</p>
      <p className="m-auto w-3/4 text-left text-xl font-bold">
        My Saved Interests!
      </p>
      <div className="m-auto w-3/4 text-left">
        <div>
          {categoryData ? (
            categoryData?.map((item, index) => {
              return (
                <div key={index} className="my-3 items-center">
                  <input
                    type="checkbox"
                    checked={
                      userCategories &&
                      userCategories.some((ele) => ele.categoryId === item.id)
                    }
                    className="mr-2 h-5 w-5 cursor-pointer align-middle"
                    onChange={(e) =>
                      handleInputChange(e, item.id, e.target.checked)
                    }
                  />
                  <label className="text-lg">{item.name}</label>
                </div>
              );
            })
          ) : (
            <p>No data Available At the moment!</p>
          )}
        </div>
        <div className="my-6">
          <PaginationComp
            numberOfPages={15}
            currentPage={currentPage}
            updateCurrentPage={updateCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Category;
