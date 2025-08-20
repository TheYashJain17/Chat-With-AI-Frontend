"use client"

import React, { useState } from 'react'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import {useForm} from "react-hook-form";
import { LogInProps } from '@/types/types'
// import { logInUser } from '@/services/user.service'
import UserService from '@/services/user.service'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import { errorMsg, extractErrorMessage, successMsg } from '@/utils/utilities'
import { useAuthStore } from '@/store/store'



const LoginModal = (): React.JSX.Element => {

    const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<LogInProps>();
    const router = useRouter();
    const {token, setToken} = useAuthStore();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    // console.log("The token from zustand is", token);

    // const logInUser = async({email, password}: LogInProps): Promise<void> => {

    //     try {

    //         if(!email || !password){

    //             errorMsg("Please Provide All Information");
    //             return;

    //         }




    //     } catch (error) {

    //         console.log(error);
            
    //     }

    // }

    const handleLogInUser = async(data: LogInProps): Promise<void> => {

        try {

            const response = await UserService.logInUser(data) as AxiosResponse;

            console.log("the response is", response);

            if(!response?.data?.success){

                errorMsg("Failed To Login, Please Try After Sometime");
                return;

            }

            console.log("The response we are getting after successfull login is", response)

            const token = response?.data?.data?.loginToken;

            console.log("The token we are saving is", token);

                localStorage.setItem("token", token);
                setToken(token);
                
                successMsg("Login Successfull");

                setTimeout(() => {

                    router.push("/chat");

                }, 3000)
            
        } catch (error: unknown) {

            // const err = error as AxiosError<{message: string}>

            const errMsg = extractErrorMessage(error);

            // console.log(errMsg);

            errorMsg(errMsg as string)

        }finally{

            reset();

        }

        

    }

    return (


        <div className={cn("max-w-[400px] w-full h-[500px] rounded-xl border border-white bg-white flex items-center flex-col gap-10 p-4 md:p-7 mx-4 shadow-all-sides")}>
        {/* // <div className={cn("max-w-[400px] w-full h-[500px] rounded-xl border border-white/30 bg-white/10 backdrop-blur-lg shadow-lg flex items-center flex-col gap-10 p-4 md:p-7 mx-4")}> */}




            <div className={cn("flex items-center justify-center gap-2 flex-row")}>

                <Image

                    src={"/assets/Login/AI-App-Logo.png"}
                    alt='ChatWithDocs'
                    height={500}
                    width={500}
                    className={cn("h-7 w-7 md:h-10 md:w-10 rounded-xl")}
                />

                <span className={cn("text-xl md:text-2xl text-black font-bold")}>Chat With Docs</span>

            </div>

            <div className={cn("flex items-center justify-center flex-col gap-5 w-full")}>

                <h1 className={cn("text-left w-full text-xl md:text-2xl font-medium md:font-semibold text-black")}>Login</h1>



                <form onSubmit={handleSubmit(handleLogInUser)} className={cn("w-full flex items-center justify-center flex-col gap-5")}>

                <div className='flex justify-start flex-col gap-2 w-full'>

                    <span className={cn("text-sm font-normal md:text-base md:font-medium text-black pl-1")}>Email</span>
                    <Input  
                    placeholder='Enter Your Email Address' 
                    type='email' 
                    className={cn("text-black placeholder:text-black")}
                    {...register("email", {required: true, minLength: 11, maxLength: 40})}
                    required
                    />
                    {errors.email && <span className="text-red-500 text-sm">Invalid email</span>}


                </div>

                <div className={cn("flex justify-start flex-col gap-2 w-full")}>

                    <span className={cn("text-sm font-normal md:text-base md:font-medium text-black pl-1")}>Password</span>

                    <div className={cn("flex justify-start w-full relative flex-col gap-2")}>

                    <Input 
                    placeholder='Enter Your Password' 
                    type={showPassword ? "text" : "password"} 
                    className={cn("text-black placeholder:text-black w-full")}
                    {...register("password", {minLength: 6, maxLength: 20, required: true})}
                    required
                    
                    />
                    {errors.password && <span className="text-red-500 text-sm">Invalid password</span>}

                    <span className={cn("absolute right-5 top-3")} onClick={() => setShowPassword(!showPassword)}>
                        {

                            showPassword ? 

                            <IoMdEye size={20} className={cn("cursor-pointer")}/>
                            :
                            <IoIosEyeOff size={20} className={cn("cursor-pointer")}/>

                        }
                        
                        </span>                        

                    </div>


                    <span className={cn("text-sm md:text-base font-normal cursor-pointer text-black pl-1")}>Forgot Password?</span>

                </div>

                <div className={cn("flex items-center justify-center flex-col gap-2 w-full mt-5")}>

                    <Button variant={"login"} size={"login"} type='submit' className={cn("text-lg md:text-xl w-2/3 md:w-full text-white border border-white")}>{isSubmitting ? "Logging In" : "LogIn "}</Button>

                    <span className={cn("text-base font-semibold cursor-pointer text-black")}>Not Registered?</span>

                </div>

                </form>




            </div>

        </div>

    )
}

export default LoginModal