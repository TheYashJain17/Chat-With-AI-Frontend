import { AddMessageToDBType } from "@/types/types";
import { axiosInstance, publicAxiosInstance } from "@/utils/instances/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";


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

    private token: string;

    constructor(token: string){

        this.token = token;

    }

    private  getAuthHeaders(){

        return {

            headers: {

                "Authorization": `Bearer ${this.token}`

            }

        }

    }

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
            const response = await publicAxiosInstance.get("/chat", {...this.getAuthHeaders(),  params });

            return response?.data;

        } catch (error) {

            throw new Error(new ExtractErrorMessage(error, "Getting Error In sendYourQuery").getErrorMessage());

        }

    }

    async addChatMessagesToDB(body: AddMessageToDBType): Promise<AxiosResponse | void>{

        const authenticationToken = this.getAuthHeaders();

        console.log("The authenticationtoken we are geteting is", authenticationToken);

        const response = await publicAxiosInstance.post("/chat/sendMessageToDb", body, {headers: {"Authorization": `Bearer ${this.token}`}});

        return response;

    }

     async getAllChatMessages(): Promise<AxiosResponse | void> {

        try {

        } catch (error) {

            console.log(error);

            throw new Error(new ExtractErrorMessage(error, "Getting Error In GetAllChatMessages").getErrorMessage());

        }

    }

}

export default ChatService;