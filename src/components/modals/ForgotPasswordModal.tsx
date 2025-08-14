"use client"

import { cn } from '@/lib/utils'
import React, { ReactPortal, useEffect, useState } from 'react'
import Image from 'next/image'
import { useForm } from "react-hook-form";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SignUpProps } from '@/types/types';
// import { checkRegisteredUser, requestOtp, resetPassword, signUpUser, verifyOtp } from '@/services/user.service';
import UserService from '@/services/user.service';
import { AxiosResponse } from 'axios';
import OtpVerification from '../shared/OtpVerification';
import { errorMsg, successMsg } from '@/utils/utilities';
import { IoMdEye, IoIosEyeOff } from "react-icons/io";


import { useRouter } from 'next/navigation';

const ForgotPasswordModal = (): React.JSX.Element => {

    const { formState: { errors, isSubmitting }, reset, handleSubmit, register, } = useForm<SignUpProps>();
    const router = useRouter();

    const [showModal, setShowModal] = useState<number>(0);

    const [userData, setUserData] = useState<SignUpProps | null>(null);

    const [otp, setOtp] = useState<string>("");
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [newPassword , setNewPassword] = useState<string>("");

    const [showPassword , setShowPassword] = useState<boolean>(false);

    const [isEmailVerification, setIsEmailVerification] = useState<boolean>(false);
    const [isOtpVerification, setIsOtpVerification] = useState<boolean>(false);
    const [isResetPassword, setIsResetPassword] = useState<boolean>(false);



    const handleEmailVerification = async(): Promise<void> => {

        try {
            
            if(!emailAddress){

                errorMsg("Please Provide Email");
                return;

            }

            setIsEmailVerification(true);

            const registerUserresponse = await UserService.checkRegisteredUser(emailAddress) as AxiosResponse;

            console.log("The response we are getting from registered user", registerUserresponse);

            if(!registerUserresponse?.data?.data?.data?.isEmailRegistered){

                errorMsg("You Are Not A Registered User, Please Signup");

                setTimeout(() => {

                    router?.push("/signup");

                }, 3000)

                return;

            }

                const otpResponse = await UserService.requestOtp(emailAddress) as AxiosResponse;

                if(!otpResponse?.data?.data?.data?.sent){

                    errorMsg("Failed To Sent OTP , Please Try Again Later");
                    return;
                    
                }
                successMsg("OTP Has Been Sent To You");
                setShowModal(1);



        } catch (error) {

            console.log(error);
            
        }finally{

            setIsEmailVerification(false);

        }


    }

    const handleOtpVerification = async(): Promise<void> => {

        try {
            
            if(!otp || !emailAddress){

                errorMsg("Please Provide All Data");
                return;

            }

            setIsOtpVerification(true);

            const response = await UserService.verifyOtp(emailAddress, otp);

            console.log("The response getting from handle verification otp is", response);

            if(!response?.data?.success){

                errorMsg("Invalid OTP");
                return;

            }

            successMsg("OTP Verified Successfully");

            setShowModal(2);

        } catch (error) {

            console.log(error);
            
        }finally{

            setIsOtpVerification(false);
            setOtp("");

        }

    }

    const handleResetPassword = async(): Promise<void> => {

        try {

            console.log("The email address is", emailAddress);
            console.log("The new password is", newPassword)

            if(!emailAddress || !newPassword){

                errorMsg("Please Provide All Data");
                return;

            }

            setIsResetPassword(true);

            const response = await UserService.resetPassword(emailAddress, newPassword) as AxiosResponse;

            console.log("The response we are getting from handle reset password is", response);

            if(!response?.data?.success){

                errorMsg("Failed To Update The Password, Please Try Again Later");
                return;

            }

            successMsg("Your Password Has Been Updated Successfully");

            setTimeout(() => {

                router.push("/login");

            }, 3000)
            
        } catch (error) {

            console.log(error);
            
        }finally{

            setIsResetPassword(false);
            setEmailAddress("");
            setNewPassword("");
            

        }

    }

    useEffect(() => {

        const handler = setTimeout(() => {

            console.log("The otp value is", otp);

        }, 3000);

        return () => {

            clearTimeout(handler);

        }

    }, [otp])

    return (


        <div className={cn("max-w-[400px] w-full rounded-xl border border-white bg-white flex items-center flex-col gap-10 p-4 md:p-5 mx-4 shadow-all-sides")}>
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

            {

                showModal === 0 ?

                    <div className={cn("flex justify-start flex-col gap-5 w-full")}>

                        <span className={cn("text-left w-full text-xl md:text-2xl font-medium md:font-semibold text-black")}>Reset Password</span>


                        <Input

                            placeholder='Enter Your Email'
                            className={cn("text-black placeholder:text-black")}
                            type='email'
                            required={true}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailAddress(e.target?.value)}

                        />

                        <Button disabled={isEmailVerification} variant={"resetPassword"} size={"resetPassword"} onClick={handleEmailVerification}>{isEmailVerification ? "Verifying User" : "Reset Password"}</Button>


                    </div>

                    :

                    showModal === 1 ?

                        <div className={cn("flex justify-center items-center flex-col gap-5 w-full")}>

                            <span className={cn("text-center w-full text-xl md:text-2xl font-medium md:font-semibold text-black")}>OTP Verification</span>


                          <OtpVerification onChange={setOtp} value={otp}/>

                            <Button disabled={isOtpVerification} variant={"resetPassword"} size={"resetPassword"} onClick={handleOtpVerification}>{isOtpVerification ? "Verifying OTP" : "Verify OTP"}</Button>


                        </div>

                        :

                        <div className={cn("flex justify-start flex-col gap-5 w-full")}>

                            <span className={cn("text-left w-full text-xl md:text-2xl font-medium md:font-semibold text-black")}>Reset Password</span>

                            <div className={cn("flex justify-start flex-col relative")}>

                                 <Input

                                placeholder='Enter Your New Password'
                                className={cn("text-black placeholder:text-black")}
                                type={showPassword ? "text" : "password"}
                                required={true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target?.value)}

                            />
                            <span className='absolute right-3 top-3'>

                                {

                                    showPassword ? 

                                    <IoMdEye size={20} className='cursor-pointer' onClick={() => setShowPassword(false)}/>
                                    :

                                    <IoIosEyeOff size={20} className='cursor-pointer' onClick={() => setShowPassword(true)}/>

                                }

                            </span>


                            </div>
                           

                            <Button disabled={isResetPassword} variant={"resetPassword"} size={"resetPassword"} onClick={handleResetPassword}>{isResetPassword ? "Updating Password" : "Update Password"}</Button>


                        </div>

            }





        </div>

    )
}

export default ForgotPasswordModal