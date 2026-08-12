import { APIsRequest } from "./APIsRequest.js";

export const ProductsAdd = (data) => APIsRequest("post", `${import.meta.env.VITE_BACKEND_URL}Product/add`, data);
export const ProductsList = (product, userId) => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}Product/list`, null, { product, userId });
export const ProductsUpdate = (id, data) => APIsRequest("put", `${import.meta.env.VITE_BACKEND_URL}Product/update/${id}`, data);
export const ProductsDelete = (id, userId) => APIsRequest("delete", `${import.meta.env.VITE_BACKEND_URL}Product/delete/${id}`, null, { userId });
export const ProductsCount = () => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}Product/count`);