import axios from "axios";

export const api = axios.create({
    baseURL: 'https://skillfactory-task.detmir.team'
})

export const getPageData = async (pageParam = 1, pathname, options = {}) => {
    const response = await api.get(`/${pathname}?page=${pageParam}&limit=20`, options);
    return response.data.data
}