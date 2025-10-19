"use client"

import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { usePathname } from 'next/navigation'

const ChatSectionWrapper = ({children}: {children: React.ReactNode}): React.JSX.Element => {


const pathName = usePathname();

    return (
        <div>

            <AnimatePresence mode='wait'>

                <motion.div
                    key={pathName}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}

                >

                    {children}

                </motion.div>

            </AnimatePresence>

        </div>
    )
}

export default ChatSectionWrapper