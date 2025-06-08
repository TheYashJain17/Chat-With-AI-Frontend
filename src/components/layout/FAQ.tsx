import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQData } from '@/types/types'
import { cn } from '@/lib/utils'

const FAQ = (): React.JSX.Element => {

    const FAQAllData: FAQData[] = [

        {

            title: "Can I try ChatWithDocs AI for free?",
            description: "Yes You Can"


        },

        {

            title: "How secure is my data with ChatBuddy AI?",
            description: "It Is Fully Secure As We Do Not Store Any Of Your Data"

        },
        {

            title: "Can I Trust ChatWithDocs AI With The Information I Will Recieve",
            description: "Yes, As AI Will Analyse Your Document Properly And Will Give You Proper Information"

        }

    ]

    return (

        <div className={cn("flex items-center justify-center w-full mx-5")}>


              <Accordion type="single" className={cn("mx-3 w-full")} collapsible>

            {

                FAQAllData?.map((faq: FAQData, index: number) => {

                    const lastItemDescription = index === FAQAllData?.length -1;

                    const description = lastItemDescription ? 

                    (() => {

                        const splitText = faq?.description?.split("Give");
                        if(splitText?.length > 0){

                            return (

                                <>

                                    {splitText[0]} Give 
                                    <br/>

                                    {splitText[1]?.trim()}

                                </>

                            )

                        }

                        return faq?.description;

                    })()

                    :

                    faq?.description;
                    
                    return(

                    <AccordionItem key={index} className={cn("w-full")} value={`item-${index+1}`}>
                        <AccordionTrigger className={cn("max-w-[70rem] w-full border border-gray-300 my-3 p-3 font-bold")}>{faq?.title}</AccordionTrigger>
                        <AccordionContent className={cn("max-w-[40rem] w-full px-3 border-[1px] border-gray-200 pt-3 font-semibold")}>
                                {description}
                        </AccordionContent>
                    </AccordionItem>

                )
            
        })

            }




        </Accordion>
        </div>


      
    )
}





export default FAQ  