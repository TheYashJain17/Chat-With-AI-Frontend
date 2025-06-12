import {LogInProps} from "@/types/types";
import { axiosInstance } from "@/utils/instances/axiosInstance";
import { errorMsg } from "@/utils/utilities";

const logInUser = async({email, password}: LogInProps): Promise<object | void> => {

    try {
        
        if(!email || !password){

            errorMsg("Please Provide All Credentials");
            return;

        }

        console.log(email);
        console.log(password);
        
        const body = {

            emailAddress:email,
            password: password

        }

        const response = await axiosInstance.post("/user/login", body);

        console.log(response?.data);

        // console.log(response?.data?.data?.data?.loginToken);


        return response;


    } catch (error) {

        console.log(error);
        
    }

}


export {logInUser}