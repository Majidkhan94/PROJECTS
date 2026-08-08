import {APIsRequest} from "./APIsRequest.js";

export const Registeration = (data) => APIsRequest( "post", `${import.meta.env.VITE_BACKEND_URL}Admin/registeration`, data);
export const Login = (data) => APIsRequest( "post", `${import.meta.env.VITE_BACKEND_URL}Admin/login`, data);
export const GETADMINPROFILE = (Id) => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}Admin/${Id}`);
export const PROFILEUPDATE = (Id, formData) => APIsRequest("put", `${import.meta.env.VITE_BACKEND_URL}Admin/update/${Id}`, formData);
