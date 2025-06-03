import React from 'react'
import Image from 'next/image'
import { BeneficialForDataProps } from '@/types/types'
import { cn } from '@/lib/utils'

const BeneficialFor = (): React.JSX.Element => {

 const BeneficialForData: BeneficialForDataProps[] = [

  {
    title: "Software Engineers",
    description: "Understand technical docs and APIs quickly.",
    image: "/assets/BeneficialFor/software_engineer_cwd.png",
  },
  {
    title: "Industry Professionals",
    description: "Access and explore internal docs with ease.",
    image: "/assets/BeneficialFor/industry_professionals_cwd.png",
  },
  {
    title: "Instructors & Researchers",
    description: "Summarize papers and simplify complex topics.",
    image: "/assets/BeneficialFor/instructors_cwd.png",
  },
  {
    title: "Legal Industry",
    description: "Analyze contracts and legal docs faster.",
    image: "/assets/BeneficialFor/legal_industry_cwd.png",
  },
  {
    title: "Finance Industry",
    description: "Interpret financial reports and filings easily.",
    image: "/assets/BeneficialFor/finance_industry_cwd.png",
  },
  {
    title: "Media & Publishing",
    description: "Review and summarize content efficiently.",
    image: "/assets/BeneficialFor/media_industry_cwd.png",
  },

]



  return (
    <div className={cn("flex items-center justify-center flex-col gap-8 lg:gap-16")}>

      <h1 className={cn("text-3xl md:text-4xl lg:text-5xl text-black font-semibold lg:font-bold px-2")}>Who Can <span className={cn("text-3xl md:text-4xl lg:text-5xl text-landing-blue font-semibold lg:font-bold")}>Benefit?</span></h1>

    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-2")}>


        {

          BeneficialForData?.map((beneficialFor: BeneficialForDataProps, index: number) => {

            return (

                <div key={index} className={cn("flex items-center justify-center flex-col gap-2 px-2")}>


                  <Image

                    height={500}
                    width={500}
                    src={beneficialFor?.image}
                    alt={beneficialFor?.title}
                    className='h-10 w-10 rounded-xl'

                  />

                  <h2 className={cn("text-xl font-semibold text-center")}>{beneficialFor?.title}</h2>

                  <span className='text-center text-base md:w-5/6 text-landing-grey'>{beneficialFor?.description}</span>

                </div>


            )

          })



        }




      </div>


    </div>
  )
}

export default BeneficialFor