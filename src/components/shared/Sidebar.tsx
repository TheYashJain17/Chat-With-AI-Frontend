import { Navlinks, SidebarProps } from '@/types/types'
import React, { useState } from 'react'

import Link from 'next/link'
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';

const Sidebar:React.FC<SidebarProps> = ({isOpen, setIsOpen}): React.JSX.Element => {

    const Navbarlinks: Navlinks[] = [

        {

            label: "Features",
            href: "features"

        },
        {

            label: "How It Works",
            href: "howItWorks"

        },
        {

            label: "Pricing",
            href: "pricing"

        },
        {

            label: "FAQ",
            href: "faq"

        }

    ]

    const NavbarItemLinks = (): React.JSX.Element => {

        return (

            <div className='flex justify-start gap-5 flex-col'>

                {

                    Navbarlinks?.map((navItem: Navlinks, index: number) => {

                        return (

                            <Link
                                key={index}
                                href={navItem}
                                className='text-white text-2xl cursor-pointer'

                            >

                                {navItem?.label}
                            </Link>

                        )

                    })

                }

            </div>

        )

    }

    return (
        <div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>

                <SheetTrigger asChild>Open</SheetTrigger>

                <SheetContent className='bg-black'>

                    <SheetTitle className='flex justify-start p-5'>

                        <X size={40} className='text-white font-semibold text-xl' onClick={() => setIsOpen(false)}/>

                    </SheetTitle>

                    <SheetContent className='flex justify-start gap-5 flex-col p-10 mt-20'>

                        <NavbarItemLinks />

                    </SheetContent>

                </SheetContent>

            </Sheet>

        </div>
    )
}

export default Sidebar  