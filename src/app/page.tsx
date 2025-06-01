import HeadingSection from '@/components/layouts/HeadingSection'
import Header from '@/components/shared/Header'
import { cn } from '@/lib/utils'
import React from 'react'

const page = (): React.JSX.Element => {
  return (


      <div className={cn("flex items-center justify-center w-full flex-col gap-20")}>

        <Header/>
        
        <HeadingSection/>

      </div>

  )
}

export default page