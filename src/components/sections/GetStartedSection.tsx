import { cn } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'

const GetStartedSection = (): React.JSX.Element => {
    return (


        <div className={cn("flex items-center justify-center mt-10")}>

            <div className={cn("items-center justify-center mx-5 absolute hidden sm:flex")}>



                <Image

                    src={"/assets/GetStarted/GetStartedBG-1.png"}
                    alt='GetStarted'
                    height={500}
                    width={500}
                    className={cn("h-[18rem] max-w-[53rem] w-full rounded-xl")}

                />

            </div>

            <div className={cn("items-center justify-center mx-5 absolute flex sm:hidden")}>



                <Image

                    src={"/assets/GetStarted/GetStartedBG-2.png"}
                    alt='GetStarted'
                    height={500}
                    width={500}
                    className={cn("h-[20rem] w-full rounded-xl")}

                />

            </div>


            <div className={cn("flex items-center justify-center flex-col gap-5 relative mx-5 px-2 z-10")}>

                <h1 className={cn("text-white font-bold text-xl sm:text-4xl text-center")}>Get Started with <br /> ChatBuddy AI Today!</h1>
                <span className={cn("text-base text-white text-center w-3/5 sm:w-full")}>Unlock seamless automation, instant support, and smarter conversations—<br />all in one AI-powered assistant.</span>
                <Button size={"trial"} variant={"trial"} className={cn("bg-white text-base sm:text-lg font-semibold rounded-3xl text-landing-blue2")}>Try 7-Days Free Trial</Button>

            </div>

        </div>
    )
}

export default GetStartedSection