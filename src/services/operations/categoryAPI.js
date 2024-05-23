import toast from "react-hot-toast";
import { categories } from "../api";
import { apiConnector } from "../apiconnector";

const {GET_CATEGORY_PAGE_DETAILS} = categories;

export const getFullCategoryDetails = async (categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    console.log("categoryId -> ", categoryId);
    try {
      const response = await apiConnector("POST", GET_CATEGORY_PAGE_DETAILS, {
        categoryId,
      });
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Category Page Details");
      }
      result = response?.data;
    } catch (error) {
      console.log("GET_CATEGORY_PAGE_DETAILS API ERROR............", error);
      toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
  };