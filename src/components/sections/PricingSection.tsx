import React from 'react'
import PriceModal from '../modals/PriceModal'
import { PricingModalDataProps } from '@/types/types'
import { cn } from '@/lib/utils'

const PricingSection = (): React.JSX.Element => {

  const PricingModalData: PricingModalDataProps[] = [

    {

      title: "Starter",
      type: "FREE",
      description: "Perfect for individuals getting started.",
      features: [

          "This is the sample feature 1",
          "This is the sample feature 2",
          "This is the sample feature 3",
          "This is the sample feature 4",
          "This is the sample feature 5",

      ]

    },
    {

      title: "Professional",
      type: "$25/month",
      description: "For professionals and growing teams.",
      features: [

          "This is the sample feature 1",
          "This is the sample feature 2",
          "This is the sample feature 3",
          "This is the sample feature 4",
          "This is the sample feature 5",

      ]

    },
    {

      title: "Business",
      type: "$45/month",
      description: "For businesses ready to scale.",
      features: [

          "This is the sample feature 1",
          "This is the sample feature 2",
          "This is the sample feature 3",
          "This is the sample feature 4",
          "This is the sample feature 5",

      ]

    },


  ]

  return (
    <div className={cn("flex items-center justify-center flex-col gap-12 ")}>

        <div className={cn("flex items-center justify-center flex-col gap-7")}>

            <h1 className={cn("text-3xl lg:text-5xl font-semibold lg:font-bold text-center")}>Flexible <span className={cn("text-3xl lg:text-5xl font-semibold lg:font-bold text-landing-blue")}>Pricing</span> for Every Need!</h1>
            <span className={cn("text-lg lg:text-xl text-landing-grey text-center mx-2")}>Choose the perfect plan for your needs-no hidden fees, just powerful AI at your fingertips!</span>

        </div>
        <div className={cn("flex items-center justify-center w-full flex-col md:flex-row gap-10 md:gap-5")}>

          {

            PricingModalData?.map((modalData: PricingModalDataProps, index: number) => (

              <div className={cn("flex items-center justify-center w-full")}>

                  <PriceModal key={index} pricingModalData={modalData} index={index}/>

              </div>



            ))

          }


        </div>

    </div>
  )
}

export default PricingSection