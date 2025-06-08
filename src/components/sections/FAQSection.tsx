import React from 'react'
import HowItWorks from '../layout/HowItWorks'
import FAQ from '../layout/FAQ'
import { cn } from '@/lib/utils'

const FAQSection = (): React.JSX.Element => {
  return (
    <div className={cn("flex justify-between flex-col md:flex-row gap-6 md:gap-10 max-w-[70rem] w-full")}>

      <div className={cn("flex justify-start flex-col gap-5")}>

          <h1 className={cn("text-3xl md:text-5xl font-bold text-left mx-5")}>Frequently <span className={cn("text-3xl md:text-5xl font-bold text-landing-blue2 ")}>Asked <br/> Questions</span></h1>
          <span className={cn("text-base text-landing-grey mx-5")}>For any unanswered questions, reach out to our support team via <br/> contact us page or email. We'll respond with-in a day to assist you.</span>

      </div>



      <div className={"flex items-center justify-center flex-col gap-4"}>

          <HowItWorks/>

          <FAQ/>

      </div>

    </div>
  )
}

export default FAQSection