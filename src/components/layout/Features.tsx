import { cn } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'

const Features = ():React.JSX.Element => {
  return (
    <div className={cn("flex items-center justify-center flex-col gap-6 w-full")}>

        <div className={cn("flex items-center justify-center px-5 py-2")}>

            <h1 className={cn("text-5xl font-bold text-center hidden lg:block")}>Your All-in-One <span className={cn("text-landing-blue font-bold")}>AI-Powered Assistant</span> for <br/> Instant Support, Productivity & Automation!</h1>
            <h1 className={cn("text-4xl font-semibold text-center hidden md:block lg:hidden")}>Your All-in-One <span className={cn("text-landing-blue font-bold")}><br/> AI-Powered Assistant</span> for Instant Support, Productivity & Automation!</h1>
            <h1 className={cn("text-3xl font-medium text-center md:hidden")}>Your All-in-One <span className={cn("text-landing-blue font-bold")}><br/> AI-Powered Assistant</span> for Instant Support, Productivity & Automation!</h1>

        </div>
        <div>

            <div className={cn("grid grid-cols-2 lg:grid-cols-4 w-full px-5 py-2 gap-5 lg:gap-28")}>

                <div className={cn("flex items-center justify-center gap-1 flex-row cursor-pointer")}>

                    <Image
                    
                        src={"/assets/Features/chat.svg"}
                        alt='chat'
                        height={500}
                        width={500}
                        className='h-7 w-7 rounded-xl'

                    />

                    <span className={cn("text-landing-blue font-bold")}>AI Chat</span>

                </div>
                <div className={cn("flex items-center justify-center gap-1 flex-row cursor-pointer")}>

                    <Image
                    
                        src={"/assets/Features/writer.svg"}
                        alt='chat'
                        height={500}
                        width={500}
                        className='h-7 w-7 rounded-xl'


                    />

                    <span className={cn("font-bold text-landing-grey")}>AI Writer</span>

                </div>
                <div className={cn("flex items-center justify-center gap-1 flex-row cursor-pointer")}>

                    <Image
                    
                        src={"/assets/Features/summary.png"}
                        alt='chat'
                        height={500}
                        width={500}
                        className='h-7 w-7 rounded-xl'

                    />

                    <span className={cn("font-bold text-landing-grey")}>AI Summary</span>

                </div>
                <div className={cn("flex items-center justify-center gap-1 flex-row cursor-pointer")}>

                    <Image
                    
                        src={"/assets/Features/search.svg"}
                        alt='chat'
                        height={500}
                        width={500}
                        className='h-7 w-7 rounded-xl'


                    />

                    <span className={cn("font-bold text-landing-grey")}>AI Search</span>

                </div>

            </div>

        </div>

    </div>
  )
}

export default Features