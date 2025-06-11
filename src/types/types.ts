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

export interface PricingModalDataProps{

    title: string;
    type: string;
    description: string;
    features: string[];

}

export interface PricingModalProps{

    pricingModalData: PricingModalDataProps
    index: number;

}

export interface FAQData{

    title: string;
    description: string;

}

export interface LogInProps{

    email: string;
    password: string;

}