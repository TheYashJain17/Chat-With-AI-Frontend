import { AxiosError } from "axios";
import {toast} from "react-hot-toast";

const successMsg = (msg: string) => toast.success(msg, {duration: 4000});

const errorMsg = (msg: string) => toast.error(msg, {duration: 4000});

const extractErrorMessage = (error: unknown): string => {

    const err = error as AxiosError<{message: string}>;

    return err.response?.data?.message ?? err?.message;

}


const fetchToken = async(): Promise<string> => {

    let token: string;

    if(typeof window !== "undefined"){

        const tokenObject = localStorage.getItem("token");
        
        token = JSON.parse(tokenObject as string)?.state?.token ?? "";

    }else{

const  { cookies } = await import("next/headers");


        token = (await cookies()).get("token")?.value as string ?? "";

    }

    return token;

            

}

export {successMsg, errorMsg, extractErrorMessage, fetchToken};
