import { APIsRequest } from "../APIs/APIsRequest";

export const CreateCheckoutSession = (items) => APIsRequest("post", `${import.meta.env.VITE_BACKEND_URL}payment/create-checkout-session`, { items });