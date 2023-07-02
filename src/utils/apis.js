import axios from "axios";
import { BASE_URL } from "./constants";
import { useDispatch } from "react-redux";
import { updateCartItems } from "@/store/features/dataCartUpdateSlice";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// Обновление состава корзины
export const updateCart = async (data) => {
  try {
    const requestBody = {
      data: data,
    };

    await axios.post(`${BASE_URL}/cart/update`, requestBody, { headers, withCredentials: true })
  } catch (error) {
    console.error("Ошибка при выполнении запроса обновления корзины", error);
    throw error;
  }
};