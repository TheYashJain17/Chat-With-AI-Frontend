import Header from '@/components/shared/Header'
import { cn } from '@/lib/utils'
import React from 'react'

const page = (): React.JSX.Element => {
  return (


      <div className={cn("flex items-center justify-center w-full")}>

        <Header/>

      </div>

  )
}

export default page