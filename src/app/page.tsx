import BeneficialFor from '@/components/layout/BeneficialFor'
import Features from '@/components/layout/Features'
import HeadingSection from '@/components/sections/HeadingSection'
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

      </div>

  )
}

export default page