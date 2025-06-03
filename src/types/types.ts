import React from "react"

export interface Navlinks{

    label: string,
    href: string

}

export interface SidebarProps{

    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>

}


export interface BeneficialForDataProps{

    title: string;
    description: string;
    image: string;

}