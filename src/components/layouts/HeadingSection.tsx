import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const HeadingSection = (): React.JSX.Element => {
  return (
    <div className={cn("flex items-center justify-center gap-5 flex-col w-full")}>

        <div className={cn("flex items-center justify-center w-full px-5 py-2")}>

            <h1 className={cn("font-bold text-5xl text-center hidden lg:block")}>Transform Your Conversations <br/> With Smart <span className={cn("text-landing-blue")}>AI Chatbots!</span></h1>
            <h1 className={cn("font-bold text-4xl text-center hidden md:block lg:hidden")}>Transform Your Conversations <br/>  With Smart <span className={cn("text-landing-blue")}>AI Chatbots!</span></h1>
            <h1 className={cn("font-medium text-3xl text-center block md:hidden")}>Transform Your <br/> Conversations With <br/> Smart <span className={cn("text-landing-blue")}>AI Chatbots!</span></h1>

        </div>
        <div className={cn("flex items-center justify-center p-2")}>

            <span className={cn("text-center text-base text-[#545C66] hidden lg:block font-poppins")}>Discover the power of ChatBuddy AI - your ultimate personal AI companion designed to <br/> enhance communication and supercharge your productivity.</span>
            <span className={cn("text-center text-base text-[#545C66] hidden md:block lg:hidden")}>Discover the power of ChatBuddy <br/> AI - your ultimate personal AI companion designed to <br/>  enhance communication and supercharge your productivity.</span>
            <span className={cn("text-center text-base text-[#545C66] block md:hidden")}>Discover the power of ChatBuddy AI - your ultimate personal AI companion designed to enhance communication and supercharge your productivity.</span>

        </div>
        <div>

            <Button variant={"trial"} size={"trial"}>Start Your Free Trial</Button>

        </div>

    </div>
  )
}

export default HeadingSection