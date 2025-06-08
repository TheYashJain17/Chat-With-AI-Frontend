import { cn } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'

const Footer = (): React.JSX.Element => {
  return (

            <div className={cn("flex items-center justify-between w-full bg-black px-3 mt-10 flex-col sm:flex-row")}>

                <div className={cn("flex items-center justify-center gap-1 flex-row py-3")}>

                    <Image
                    
                        src={"/assets/Footer/AI-App-Logo.png"}
                        alt='Icon'
                        height={500}
                        width={500}
                        className={cn("h-12 w-12 rounded-xl")}

                    />
                    
                    <span className={cn("text-white font-bold")}>ChatWithDocs AI</span>

                </div>

                <span className={cn("text-white font-bold")}>Created By Yash Jain</span>

            </div>

  )
}

export default Footer