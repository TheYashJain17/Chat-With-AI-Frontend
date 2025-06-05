import { cn } from '@/lib/utils'
import React from 'react'

import { FaCheck } from "react-icons/fa6";
import { Button } from '../ui/button';
import { PricingModalProps } from '@/types/types';

const PriceModal: React.FC<PricingModalProps> = ({pricingModalData, index}): React.JSX.Element => {


  return (

    <div className={cn("max-w-[280px] h-[390px] md::max-w-[310px] w-full md:h-[430px] border border-black rounded-xl flex justify-center flex-col p-5 gap-6 md:gap-3 lg:gap-8 mx-2", index === 1 ? "bg-[#4B5563]" : "bg-[#E5E7EB]")}>

        <div className={cn("flex justify-start flex-col gap-3")}>

            <h3 className={cn("text-md md:text-sm lg:text-md underline font-bold", index === 1 ? "text-white": "text-black")}>{pricingModalData?.title}</h3>
            <h1 className={cn("text-2xl md:text-xl lg:text-3xl font-bold", index === 1 ? "text-white": "text-black")}>{pricingModalData?.type}</h1>

        </div>

        <div className={cn("flex justify-start flex-col gap-3")}>

            <span className={cn("text-sm md:text-xs lg:text-sm", index === 1 ? "text-white": "text-black")}>{pricingModalData?.description}</span>

            <ul className={cn("flex items-start flex-col")}>

                {

                    pricingModalData?.features?.map((feature: string, key: number) => (

                        <li key={key} className={cn("flex items-center justify-center gap-1 text-md md:text-sm lg:text-md" , index === 1 ? "text-white": "text-black")}><FaCheck size={22} color='green'/> {feature}</li>


                    ))

                }


            </ul>

        </div>

        <div className={cn("flex items-center justify-center w-full")}>

            <Button size={"trial"} variant={"trial"} className={cn("w-full")}>Try Free Trial</Button>

        </div>


    </div>
  )
}

export default PriceModal   