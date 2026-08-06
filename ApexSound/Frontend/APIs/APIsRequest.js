import axios from "axios";

export const APIsRequest = async (method, url, data = null, headers = {}) => {
    try{
            const response = await axios({method, url, data, headers: {"Content-Type" : "application/json", ...headers}})
            return{
                        success: true,
                        error: null,
                        data: response?.data,
                        message: response?.data?.message
                    };
        }
    catch (error) {
         return{ 
                    success: false,
                    error: console.log(error),
                    data: null,
                    message: error?.response?.data?.message
                }
};}
