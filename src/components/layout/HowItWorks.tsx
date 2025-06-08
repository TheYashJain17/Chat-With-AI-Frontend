import { cn } from '@/lib/utils'
import React from 'react'

const HowItWorks = (): React.JSX.Element => {
  return (
    <div className={cn("flex items-center justify-center w-full")}>

        <div className={cn("md:max-w-[520px] w-full min-h-[140px] bg-landing-blue2 rounded-xl border-none flex justify-start gap-5 flex-col p-5 mx-5")}>

          <h2 className={cn("text-white text-base md:text-lg font-semibold")}>What is ChatBuddy AI, and how does it work?</h2>
          <span className={cn("text-white text-sm md:text-base font-medium")}>ChatBuddy AI is an all-in-one AI-powered assistant designed to automate conversations, provide instant responses, and enhance productivity. It integrates with various platforms like websites, social media, and messaging apps to streamline customer support and task management.</span>

        </div>

    </div>
  )
}

export default HowItWorks