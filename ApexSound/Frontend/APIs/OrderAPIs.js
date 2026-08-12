import { APIsRequest } from "./APIsRequest.js";

export const AddOrder = (data) => APIsRequest("post", `${import.meta.env.VITE_BACKEND_URL}orders/add`, data);
export const GetAllOrders = () => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}orders/all`);
export const GetOrdersByUser = (userId) => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}orders/user/${userId}`);
export const GetOrdersByVendor = (vendorId) => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}orders/vendor/${vendorId}`);
export const UpdateOrderStatus = (id, status) => APIsRequest("put", `${import.meta.env.VITE_BACKEND_URL}orders/status/${id}`, status);
export const OrderCount = () => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}Orders/count`)