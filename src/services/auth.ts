import {LogInProps, SignUpProps} from "@/types/types";
import { axiosInstance } from "@/utils/instances/axiosInstance";
import { errorMsg } from "@/utils/utilities";
import { AxiosResponse } from "axios";

const logInUser = async({email, password}: LogInProps): Promise<AxiosResponse | void> => {

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
// emailAddress, userName, password
const signUpUser = async({email, username, password, confirmpassword}: SignUpProps): Promise<AxiosResponse |  void> => {

    try {   
        
        if(!email || !username || !password){

            errorMsg("Please Provide All Required Fields");
            return;

        }

        if(password !== confirmpassword){

            errorMsg("Password And confirm Password Must Be Same");
            return;

        }

        const body = {

            emailAddress: email,
            userName: username,
            password: password

        }

        const response = await axiosInstance?.post("/user/signup", body);

        return response;


    } catch (error) {

        console.log(error);
        
    }

} 


export {logInUser, signUpUser}