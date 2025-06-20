import ForgotPasswordModal from '@/components/modals/ForgotPasswordModal'
import SignupModal from '@/components/modals/SignupModal'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const page = (): React.JSX.Element => {
  return (
    <div className={cn("bg-landing-blue2 flex items-center justify-center")}>
  
          <Image
          
              src={"/assets/Login/LoginBG.png"}
              alt='Login BG'
              height={1000}
              width={1000}
              className={cn("min-w-screen min-h-screen relative blur-xl")}
  
          />

           <div className={cn("absolute mx-5")}>

            <Image

                src={"/assets/Login/LoginBG.png"}
                alt='Login BG'
                height={1000}
                width={1000}
                className={cn("max-w-[32rem] w-full h-[24rem] border-2 border-landing-blue2 rounded-2xl shadow-all-sides")}

            />

        </div>

        
            <div className={cn("absolute w-full flex items-center justify-center")}>

            <ForgotPasswordModal/>

            </div>


    </div>
  )
}

export default page