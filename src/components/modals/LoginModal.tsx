"use client"

import React, { useState } from 'react'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { IoMdEye, IoIosEyeOff } from "react-icons/io";


const LoginModal = (): React.JSX.Element => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

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
                <div className='flex justify-start flex-col gap-2 w-full'>

                    <span className={cn("text-sm font-normal md:text-base md:font-medium text-black")}>Email</span>
                    <Input  
                    placeholder='Enter Your Email Address' 
                    type='email' 
                    className={cn("text-black placeholder:text-black")}
                    />

                </div>

                <div className={cn("flex justify-start flex-col gap-2 w-full")}>

                    <span className={cn("text-sm font-normal md:text-base md:font-medium text-black")}>Password</span>

                    <div className={cn("flex justify-start w-full relative")}>

                    <Input 
                    placeholder='Enter Your Password' 
                    type={showPassword ? "text" : "password"} 
                    className={cn("text-black placeholder:text-black w-full")}
                    
                    />

                    <span className={cn("absolute right-5 top-3")} onClick={() => setShowPassword(!showPassword)}>
                        {

                            showPassword ? 

                            <IoMdEye size={20} className={cn("cursor-pointer")}/>
                            :
                            <IoIosEyeOff size={20} className={cn("cursor-pointer")}/>

                        }
                        
                        </span>                        

                    </div>


                    <span className={cn("text-sm md:text-base font-normal cursor-pointer text-black")}>Forgot Password?</span>

                </div>

                <div className={cn("flex items-center justify-center flex-col gap-2 w-full mt-5")}>

                    <Button variant={"login"} size={"login"} className={cn("text-lg md:text-xl w-2/3 md:w-full text-white border border-white")}>Login</Button>

                    <span className={cn("text-base font-semibold cursor-pointer text-black")}>Not Registered?</span>

                </div>

            </div>

        </div>

    )
}

export default LoginModal