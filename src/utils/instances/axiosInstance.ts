import axios from "axios";

import { fetchToken } from "../utilities";

const url: string = process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string;

const baseConfig = {

    baseURL: url,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    
    }  

}

export const publicAxiosInstance = axios.create(baseConfig)


publicAxiosInstance.interceptors.response.use(

    (response) => response,
    (error) => {

        if(error?.response?.status === 401){

            return Promise.reject("Your Session Expired , Please Login again")

        }

        return Promise.reject(error)

    }

)


export const axiosInstance = axios.create(baseConfig)

axiosInstance.interceptors.request.use(

    (config) => {

        return fetchToken().then((token: string) => {
            
            config.headers.Authorization = `Bearer ${token}`;
            
            return config;
            
        })
    },

    (error) => Promise.reject(error)

)
