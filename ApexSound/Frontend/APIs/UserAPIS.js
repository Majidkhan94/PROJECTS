import {APIsRequest} from "./APIsRequest.js";

export const Registeration = (data) => APIsRequest( "post", `${import.meta.env.VITE_BACKEND_URL}User/registeration`, data);
export const Login = (data) => APIsRequest( "post", `${import.meta.env.VITE_BACKEND_URL}User/login`, data);
export const GETUSERPROFILE = (Id) => APIsRequest( "get", `${import.meta.env.VITE_BACKEND_URL}User/${Id}`);
export const PROFILEUPDATE = (Id, formData) =>APIsRequest("put", `${import.meta.env.VITE_BACKEND_URL}User/update/${Id}`, formData);
export const USERDELETE = (Id) => APIsRequest("delete", `${import.meta.env.VITE_BACKEND_URL}User/delete/${Id}`);
export const GETUSERLIST = () => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}User/userlist`);
export const GETUSERCOUNT = () => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}User/usercount`);