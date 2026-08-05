import {APIsRequest} from "./APIsRequest.js";

export const NewsletterAdd = (data) => APIsRequest( "post", `${import.meta.env.VITE_BACKEND_URL}Newsletter/add`, data);
export const NewsletterList = () => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}Newsletter/list`)
export const NewsletterDelete = (id) => APIsRequest("delete", `${import.meta.env.VITE_BACKEND_URL}Newsletter/delete/${id}`)
export const NewsletterCount = () => APIsRequest("get", `${import.meta.env.VITE_BACKEND_URL}Newsletter/count`)