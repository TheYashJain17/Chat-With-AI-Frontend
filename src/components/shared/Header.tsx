"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import Sidebar from './Sidebar'

const Header = (): React.JSX.Element => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (

        <header className={cn("flex items-center justify-center px-4 lg:px-8 h-[10vh] w-full")}>

            <div className={cn("flex items-center justify-between w-full gap-5 flex-row h-full")}>

                <div className={cn("flex justify-center items-center gap-2 h-full flex-row")}>

                    <Image

                        src={"/assets/Header/AI-App-Logo.png"}
                        height={100}
                        width={100}
                        alt='AI-App'
                        className='h-10 w-10 rounded-2xl bg-cover'

                    />
                    <span className={cn('font-bold text-black md:block hidden')}>ChatWithDocs AI</span>
                    <span className={cn('font-bold text-black md:hidden')}>CWD AI</span>

                </div>


                <div className='items-center justify-center max-w-[20rem] lg:max-w-[30rem] w-full h-full hidden md:flex'>

                    <ul className={cn("flex items-center justify-between gap-5 w-full")}>

                        <li className={cn('text-black text-base font-medium cursor-pointer')}>Features</li>
                        <li className={cn('text-black text-base font-medium cursor-pointer')}>How It Works</li>
                        <li className={cn('text-black text-base font-medium cursor-pointer')}>Pricing</li>
                        <li className={cn('text-black text-base font-medium cursor-pointer')}>FAQ</li>

                    </ul>

                </div>


                <div className={cn("flex items-center justify-center gap-2")}>

                    <div className={cn("flex items-center justify-center h-full")}>

                        <Button variant={"trial"} size={"trial"}>Start Your Free Trial</Button>

                    </div>

                    <div className='flex items-center justify-center md:hidden'>

                        <span className={cn("text-black text-5xl mb-3")} onClick={() => setIsOpen(true)}>&#9776;</span>

                    </div>

                    {

                        isOpen && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

                    }

                </div>





            </div>

        </header>


    )
}

export default Header