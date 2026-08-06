import {APIsRequest} from "./APIsRequest.js";

export const ContactusAdd = (data, headers = {}) => APIsRequest( "post", `${import.meta.env.VITE_BACKEND_URL}Contactus/add`, data, headers);
export const ContactusList = () => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}Contactus/list`)
export const ContactusDelete = (id) => APIsRequest("delete", `${import.meta.env.VITE_BACKEND_URL}Contactus/delete/${id}`)
export const ContactusCount = () => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}Contactus/count`)