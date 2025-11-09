import { AddMessageToDBType } from "@/types/types";
import { axiosInstance, publicAxiosInstance } from "@/utils/instances/axiosInstance";
import axios, { AxiosError, AxiosResponse } from "axios";


class ExtractErrorMessage {

    private error: unknown;
    private customErrorMessage: string;

    constructor(error: unknown, customErrorMessage: string) {

        this.error = error;
        this.customErrorMessage = customErrorMessage;

    }


    getErrorMessage() {

        const err = this.error as AxiosError<{ message: string }>;

        return (

            err?.message ||
            err?.response?.data?.message ||
            this.customErrorMessage
        )

    }

}

class ChatService {


     async uploadFileToBackend(formData: FormData): Promise<AxiosResponse | void> {

        try {

            // const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/uploadFile`;

            // const token = localStorage.getItem("token");

            // const response: AxiosResponse = await publicAxiosInstance.post("/uploadFile", formData, { headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${this.token}` } });
            const response: AxiosResponse = await axiosInstance.post("/uploadFile", formData, { headers: { "Content-Type": "multipart/form-data" } });

            return response;

        } catch (error) {

            console.log(error);

            throw new Error(new ExtractErrorMessage(error, "Failed To Upload The Document").getErrorMessage());

        }

    }

     async sendYourQuery(userQuery: string): Promise<AxiosResponse | void> {

        try {

            const params = {
                userQuery,
            }

            // const response = await axiosInstance.get("/chat", {params});
            const response = await axiosInstance.get("/chat", {params });

            return response?.data;

        } catch (error) {

            throw new Error(new ExtractErrorMessage(error, "Getting Error In sendYourQuery").getErrorMessage());

        }

    }

    async addChatMessagesToDB(body: AddMessageToDBType): Promise<AxiosResponse | void>{

        try {

        const response = await axiosInstance.post("/chat/sendMessageToDb", body);

        return response;
            
        } catch (error) {

            console.log(error);

            throw new Error(new ExtractErrorMessage(error, "Failed To Add Message To DB").getErrorMessage());
            
        }

   

    }

     async getAllChatInstances(): Promise<{chatInstances:{role: string, message: string}, chatId: string}[] | void> {

        try {

            const response = await axiosInstance.get("/chat/getAllChats");
            return response?.data?.data || [];
            // return [];

        } catch (error) {

            console.log(error);

            throw new Error(new ExtractErrorMessage(error, "Getting Error In GetAllChatInstances").getErrorMessage());

        }

    }

    async getAllMessagesForAParticularChat(chatId: string): Promise<AxiosResponse | void> {

        try {
            
            

            const response = await axiosInstance.get(`/chat/getAllMessages?chatId=${chatId}`);
            return response;

        } catch (error) {

            console.log(error);

            throw new Error(new ExtractErrorMessage(error, "Failed To Get All Messages For A Particular Chat").getErrorMessage());
            
        }

    }

}

export default ChatService;

