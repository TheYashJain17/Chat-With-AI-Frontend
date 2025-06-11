import {LogInProps} from "@/types/types";
import { axiosInstance } from "@/utils/instances/axiosInstance";
import { errorMsg } from "@/utils/utilities";

const handleLogInUser = async({email, password}: LogInProps): Promise<void> => {

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


    } catch (error) {

        console.log(error);
        
    }

}


export {handleLogInUser}