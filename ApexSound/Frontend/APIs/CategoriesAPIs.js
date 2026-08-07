import {APIsRequest} from "./APIsRequest.js";

export const CategoriesAdd = (data) => APIsRequest( "post", `${import.meta.env.VITE_BACKEND_URL}Category/add`, data);
export const CategoriesList = () => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}Category/list`)
export const CategoriesUpdate = (id, data) => APIsRequest("put", `${import.meta.env.VITE_BACKEND_URL}Category/update/${id}`, data)
export const CategoriesDelete = (id) => APIsRequest("delete", `${import.meta.env.VITE_BACKEND_URL}Category/delete/${id}`)
export const CategoriesCount = () => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}Category/count`)