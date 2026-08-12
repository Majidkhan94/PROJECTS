import { APIsRequest } from "./APIsRequest.js";

export const AddVendorRequest = (data) => APIsRequest("post", `${import.meta.env.VITE_BACKEND_URL}vendor/add`, data);
export const GetAllVendorRequests = () => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}vendor/all`);
export const ApproveVendorRequest = (id) => APIsRequest("put", `${import.meta.env.VITE_BACKEND_URL}vendor/approve/${id}`);
export const DeleteVendorRequest = (id) => APIsRequest("delete", `${import.meta.env.VITE_BACKEND_URL}vendor/delete/${id}`);