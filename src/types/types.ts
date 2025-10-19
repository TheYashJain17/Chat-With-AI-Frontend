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

export interface SignUpProps{

    email: string;
    username: string;
    password: string;
    confirmpassword: string;

}

export interface OtpVerificationProps{

    value: string;
    onChange: (value: string) => void;

}

export interface AuthStateType{

    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;

}


export interface ChatMessageType{

    role: string;
    message: string;

}

export interface ChatMessageChunkType{

    id: string, 
    metadata: {}, 
    pageContent: string

}

export interface AddMessageToDBType{

    uploadedDocId?: string;
    chatId?:string;
    messageObj: {

        role: string;
        message: string;

    }

}