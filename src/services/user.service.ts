import { LogInProps, SignUpProps } from "@/types/types";
import { axiosInstance } from "@/utils/instances/axiosInstance";
import { errorMsg } from "@/utils/utilities";
import { AxiosResponse } from "axios";



class UserService {

    static async logInUser({ email, password }: LogInProps): Promise<AxiosResponse | void> {

        try {

            if (!email || !password) {

                errorMsg("Please Provide All Credentials");
                return;

            }

            console.log(email);
            console.log(password);

            const body = {

                emailAddress: email,
                password: password

            }

            const response = await axiosInstance.post("/user/login", body);

            console.log(response?.data);

            // console.log(response?.data?.data?.data?.loginToken);


            return response;


        } catch (error) {

            console.log(error);

            throw error

        }

    }

    static async signUpUser({ email, username, password, confirmpassword }: SignUpProps): Promise<AxiosResponse | void> {

        try {

            if (!email || !username || !password) {

                errorMsg("Please Provide All Required Fields");
                return;

            }

            if (password !== confirmpassword) {

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

            throw error;

        }

    }

    static async requestOtp(emailAddress: string): Promise<AxiosResponse | void> {

        try {

            if (!emailAddress) {

                errorMsg("Please Provide Email Address");
                return;

            }

            const body = {

                emailAddress: emailAddress

            }

            const response = await axiosInstance.post("/user/request/otp", body);

            // console.log(response);

            return response;




        } catch (error) {

            console.log(error);

            throw error;

        }

    }

    static async verifyOtp(emailAddress: string, otp: string): Promise<AxiosResponse | void> {

        try {

            if (!emailAddress || !otp) {

                errorMsg("Please Provide All Information");
                return;

            }

            const body = {

                emailAddress,
                otp

            }

            const response = await axiosInstance.post("/user/verify/otp", body);

            return response;

        } catch (error) {

            console.log(error);

        }

    }

    static async checkRegisteredUser(emailAddress: string): Promise<AxiosResponse | void> {

        try {

            if (!emailAddress) {

                errorMsg("Please Provide Email Address");
                return;

            }

            const response = await axiosInstance.get(`/user/verifyRegisteredUser/${encodeURIComponent(emailAddress)}`)

            return response;

        } catch (error) {

            console.log(error);
            // throw error;

        }

    }

    static async resetPassword(emailAddress: string, password: string): Promise<AxiosResponse | void> {

        try {

            if (!emailAddress || !password) {

                errorMsg("Please Provide All Details");
                return;

            }

            const body = {

                emailAddress: emailAddress,
                newPassword: password,

            }

            const response = await axiosInstance.post("/user/resetPassword", body);

            return response;

        } catch (error) {

            console.log(error);

        }

    }


}


export default UserService;



// const logInUser = async({email, password}: LogInProps): Promise<AxiosResponse | void> => {

//     try {
        
//         if(!email || !password){

//             errorMsg("Please Provide All Credentials");
//             return;

//         }

//         console.log(email);
//         console.log(password);
        
//         const body = {

//             emailAddress:email,
//             password: password

//         }

//         const response = await axiosInstance.post("/user/login", body);

//         console.log(response?.data);

//         // console.log(response?.data?.data?.data?.loginToken);


//         return response;


//     } catch (error) {

//         console.log(error);

//         throw error
        
//     }

// }

// const signUpUser = async({email, username, password, confirmpassword}: SignUpProps): Promise<AxiosResponse |  void> => {

//     try {   
        
//         if(!email || !username || !password){

//             errorMsg("Please Provide All Required Fields");
//             return;

//         }

//         if(password !== confirmpassword){

//             errorMsg("Password And confirm Password Must Be Same");
//             return;

//         }

//         const body = {

//             emailAddress: email,
//             userName: username,
//             password: password

//         }

//         const response = await axiosInstance?.post("/user/signup", body);

//         return response;


//     } catch (error) {

//         console.log(error);

//         throw error;
        
//     }

// } 

// const requestOtp = async(emailAddress: string): Promise<AxiosResponse | void> => {

//     try {
        
//         if(!emailAddress){

//             errorMsg("Please Provide Email Address");
//             return;

//         }

//         const body = {

//             emailAddress: emailAddress

//         }

//         const response = await axiosInstance.post("/user/request/otp", body);

//         // console.log(response);

//         return response;




//     } catch (error) {

//         console.log(error);

//         throw error;
        
//     }

// }

// const verifyOtp = async(emailAddress: string, otp: string): Promise<AxiosResponse | void> => {

//     try {

//         if(!emailAddress || !otp){

//             errorMsg("Please Provide All Information");
//             return;

//         }

//         const body = {

//             emailAddress,
//             otp

//         }
        
//         const response = await axiosInstance.post("/user/verify/otp", body);

//         return response;

//     } catch (error) {

//         console.log(error);
        
//     }

// }

// const checkRegisteredUser = async(emailAddress: string): Promise<AxiosResponse | void> => {

//     try {
        
//         if(!emailAddress){

//             errorMsg("Please Provide Email Address");
//             return;

//         }

//         const response = await axiosInstance.get(`/user/verifyRegisteredUser/${encodeURIComponent(emailAddress)}`)

//         return response;

//     } catch (error) {

//         console.log(error);
//         // throw error;
        
//     }

// }

// const resetPassword = async(emailAddress: string, password: string): Promise<AxiosResponse | void> => {

//     try {
        
//         if(!emailAddress || !password){

//             errorMsg("Please Provide All Details");
//             return;

//         }

//         const body = {

//             emailAddress: emailAddress,
//             newPassword: password,

//         }

//         const response = await axiosInstance.post("/user/resetPassword", body);

//         return response;

//     } catch (error) {

//         console.log(error);
        
//     }

// }

// export {logInUser, signUpUser, requestOtp, verifyOtp, resetPassword, checkRegisteredUser}

