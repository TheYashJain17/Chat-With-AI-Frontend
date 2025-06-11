import axios from "axios";

export const axiosInstance = axios.create({

    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    
    }  

})


axiosInstance.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if(token){

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

)


axiosInstance.interceptors.response.use(

    (response) => response,
    (error) => {

        if(error?.response?.status === 401){

            return Promise.reject("Your Session Expired , Please Login again")

        }

        return Promise.reject(error)

    }

)