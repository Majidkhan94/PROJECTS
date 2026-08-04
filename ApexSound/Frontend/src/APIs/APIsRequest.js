import axios from "axios";

export const APIsRequest = async (method, url, data = null) => {
    try{
            const response = await axios({method, url, data})
            return{
                        data: response.data,
                        success: true,
                        error: null,
                        message: response?.data?.message
                    };
        }
    catch (error) {
         return{ 
                    data: null,
                    success: false,
                    error: console.log(error),
                    message: error?.response?.data?.message
                }
};}
