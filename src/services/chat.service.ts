import { axiosInstance, publicAxiosInstance } from "@/utils/instances/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

class ExtractErrorMessage{

    private error: unknown;
    private customErrorMessage: string;

    constructor(error:unknown,customErrorMessage: string){

        this.error = error;
        this.customErrorMessage = customErrorMessage;

    }


    getErrorMessage(){

        const err = this.error as AxiosError<{message: string}>;

        return(

            err?.message ||
            err?.response?.data?.message ||
            this.customErrorMessage
        )

    }

}

class ChatService{

    static async sendYourQuery(userQuery: string): Promise<AxiosResponse | void>{

        try {

            const params = {
                userQuery,
            }

            // const response = await axiosInstance.get("/chat", {params});
            const response = await publicAxiosInstance.get("/chat", {params});

            return response?.data;
            
        } catch (error) {

            throw new Error(new ExtractErrorMessage(error, "Getting Error In sendYourQuery").getErrorMessage());
            
        }

    }

    static async getAllChatMessages(): Promise<AxiosResponse | void>{

        try {
            
        } catch (error) {

            console.log(error);

            throw new Error(new ExtractErrorMessage(error, "Getting Error In GetAllChatMessages").getErrorMessage());
            
        }

    }
    
}

export default ChatService;