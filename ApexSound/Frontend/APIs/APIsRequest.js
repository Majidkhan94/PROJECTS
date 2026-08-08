import axios from "axios";

export const APIsRequest = async (method, url, data = null, params = null, headers = {}) => {

    const isFormData = data instanceof FormData;

    try {
        const response = await axios({
            method, url, data, params, headers: {
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
                ...headers }
        });

        return {
            success: true,
            data: response?.data,
            message: response?.data?.message
        };
    }
    catch (error) {
        return {
            success: false,
            error: error?.response?.data || error?.message,
            message: error?.response?.data?.message
        };
    }
};