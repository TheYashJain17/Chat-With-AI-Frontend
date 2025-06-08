import BeneficialFor from '@/components/layout/BeneficialFor'
import Features from '@/components/layout/Features'
import FAQSection from '@/components/sections/FAQSection'
import GetStartedSection from '@/components/sections/GetStartedSection'
import HeadingSection from '@/components/sections/HeadingSection'
import PricingSection from '@/components/sections/PricingSection'
import Header from '@/components/shared/Header'
import { cn } from '@/lib/utils'
import React from 'react'

const page = (): React.JSX.Element => {
  return (


      <div className={cn("flex items-center justify-center w-full flex-col gap-10 md:gap-20")}>

        <Header/>
        
        <HeadingSection/>

        <Features/>

        <BeneficialFor/>

        <PricingSection/>

        <FAQSection/>

        <GetStartedSection/>

      </div>

  )
}

export default page