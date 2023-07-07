import axios from "axios";
import { BASE_URL } from "./constants";
import { updatePageProducts } from "@/store/features/onePageProducts";

export const fetchPageProducts = (page, limit) => {
    return async (dispatch) => {
        try {
            const url = `${BASE_URL}/products?page=${page}&limit=${limit}`
            const response = await axios.get(url);
            const { data } = response;
            const filteredData = data.data.map(item => item.id);

            dispatch(updatePageProducts(filteredData));
        } catch (error) {
            console.error("Ошибка получения товаров одной страницы", error)
        }
    }
}