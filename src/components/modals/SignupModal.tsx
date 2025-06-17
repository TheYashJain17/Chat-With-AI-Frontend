"use client"

import { cn } from '@/lib/utils'
import React, { ReactPortal, useEffect, useState } from 'react'
import Image from 'next/image'
import { useForm } from "react-hook-form";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SignUpProps } from '@/types/types';
import { requestOtp, signUpUser, verifyOtp } from '@/services/auth';
import { AxiosResponse } from 'axios';
import OtpVerification from '../shared/OtpVerification';
import { errorMsg, successMsg } from '@/utils/utilities';

import { useRouter } from 'next/navigation';

const SignupModal = (): React.JSX.Element => {

    const { formState: { errors, isSubmitting }, reset, handleSubmit, register, } = useForm<SignUpProps>();
    const router = useRouter();

    const [showModal, setShowModal] = useState<number>(0);

    const [userData, setUserData] = useState<SignUpProps | null>(null);

    const [otp, setOtp] = useState<string>("");

    const [isOtpVerification, setIsOtpVerification] = useState<boolean>(false);

    const handleUserSignup = async (data: SignUpProps): Promise<void> => {

        try {

            console.log("is it here")

            const { email, username, password, confirmpassword } = data;

            console.log(email, username, password, confirmpassword);

            const response = await requestOtp(data?.email) as AxiosResponse;

            console.log("The response ƒrom otp verification", response);

            if (response?.data?.success) {

                setUserData(data);

                successMsg("OTP Sent To Your Email")

                setShowModal(1);

            } else {

                setShowModal(0);

            }

            // const response = await signUpUser(data);

            // console.log(response);



        } catch (error) {

            console.log(error);

        }

    }

    const handleOtpVerification = async(): Promise<void> => {

        try {
            
            if(!otp || !userData?.email){

                errorMsg("Please Provide All Credentials");
                return;

            }

            setIsOtpVerification(true);

            const response = await verifyOtp(userData?.email, otp) as AxiosResponse;

            setOtp("");

            console.log(response)

            console.log(response?.data?.data);

            if(response?.data?.data?.data){

                successMsg("Otp Verified Successfully")

                const response = await signUpUser(userData) as AxiosResponse;

                console.log(response?.data);

                if(response?.data?.success){

                    successMsg("User Has Been Registered Successfully");

                    setTimeout(() => {

                        router?.push("/login");

                    }, 2000)

                }

            }

        } catch (error) {

            console.log(error);
            
        }finally{

            setIsOtpVerification(false);

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

            <div className={cn("flex items-center justify-center flex-col gap-5 w-full")}>


                {
                    
                    showModal === 0 &&
                    
                    <>
                    <h1 className={cn("text-left w-full text-xl md:text-2xl font-medium md:font-semibold text-black")}>Register</h1>
                    <form onSubmit={handleSubmit(handleUserSignup)} className={cn("w-full flex items-center justify-center flex-col gap-3")}>

                        <div className='flex justify-start flex-col gap-2 w-full'>

                            <span className={cn("text-sm font-normal md:text-base md:font-medium text-black pl-1")}>UserName</span>
                            <Input
                                placeholder='Enter Username'
                                type="text"
                                className={cn("text-black placeholder:text-black")}
                                {...register("username", { required: true, minLength: { value: 4, message: "Username is too short" }, maxLength: { value: 15, message: "Username is too long" } })}
                                required
                            />
                            {errors.username && <span className="text-red-500 text-sm">{errors?.username?.message}</span>}


                        </div>
                        <div className='flex justify-start flex-col gap-2 w-full'>

                            <span className={cn("text-sm font-normal md:text-base md:font-medium text-black pl-1")}>Email</span>
                            <Input
                                placeholder='Enter Email Address'
                                type='email'
                                className={cn("text-black placeholder:text-black")}
                                {...register("email", { required: true, minLength: 11, maxLength: 40 })}
                                required
                            />
                            {errors.email && <span className="text-red-500 text-sm">Invalid email</span>}


                        </div>

                        <div className={cn("flex justify-start flex-col gap-2 w-full")}>

                            <span className={cn("text-sm font-normal md:text-base md:font-medium text-black pl-1")}>Password</span>

                            <div className={cn("flex justify-start w-full relative flex-col gap-2")}>

                                <Input
                                    placeholder='Enter Password'
                                    type="text"
                                    className={cn("text-black placeholder:text-black w-full")}
                                    {...register("password", { minLength: { value: 6, message: "Password is too short" }, required: true })}
                                    required

                                />
                                {errors.password && <span className="text-red-500 text-sm">{errors?.password?.message}</span>}



                            </div>


                            {/* <span className={cn("text-sm md:text-base font-normal cursor-pointer text-black pl-1")}>Forgot Password?</span> */}

                        </div>
                        <div className={cn("flex justify-start flex-col gap-2 w-full")}>

                            <span className={cn("text-sm font-normal md:text-base md:font-medium text-black pl-1")}>Confirm Password</span>

                            <div className={cn("flex justify-start w-full relative flex-col gap-2")}>

                                <Input
                                    placeholder='Enter Confirm Password'
                                    type="text"
                                    className={cn("text-black placeholder:text-black w-full")}
                                    {...register("confirmpassword", { minLength: { value: 6, message: "Confirm Password is too short" }, required: true })}
                                    required

                                />
                                {errors.confirmpassword && <span className="text-red-500 text-sm">{errors?.confirmpassword?.message}</span>}

                            </div>


                            {/* <span className={cn("text-sm md:text-base font-normal cursor-pointer text-black pl-1")}>Forgot Password?</span> */}

                        </div>

                        <div className={cn("flex items-center justify-center flex-col gap-2 w-full mt-5")}>

                            <Button variant={"login"} size={"login"} type='submit' className={cn("text-lg md:text-xl w-2/3 md:w-full text-white border border-white")}>{isSubmitting ? "Signing Up" : "Sign Up"}</Button>

                            <span className={cn("text-base font-semibold cursor-pointer text-black")}>Already Registered?</span>

                        </div>

                    </form>
                    </>


                }

                {

                    showModal === 1 &&

                     <div className={cn("flex items-center justify-center flex-col gap-5")}>

                        <h1 className={cn("text-xl font-bold")}>Enter Your OTP</h1>

                        <OtpVerification value={otp} onChange={setOtp} />

                        <Button variant={"signup"} size={"signup"} onClick={handleOtpVerification} disabled={isOtpVerification}>{isOtpVerification ? "Verifying OTP" : "Verify OTP"}</Button>

                </div>

                }

               



            </div>

        </div>

    )
}

export default SignupModal