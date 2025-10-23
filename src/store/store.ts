import { AuthStateType } from "@/types/types";
import {create} from "zustand";
import {persist, PersistOptions} from "zustand/middleware";

type AuthPersist = PersistOptions<AuthStateType>;

type DocumentStore = {

    uploadedDocId: string | null,
    setUploadedDocId: (id: string) => void,
    resetUploadedDocId: () => void

}

const useAuthStore = create<AuthStateType>()(persist<AuthStateType, [], [], AuthPersist>(
    (set) => ({

    token: null,
    setToken: (token: string) => set({token}),
    clearToken: () => set({token: null})

}),
{

    name: "token",

}

))

const useDocumentStore = create<DocumentStore>(

    (set) => ({

        uploadedDocId: null,
        setUploadedDocId: (id) => set(() => ({uploadedDocId: id})),
        resetUploadedDocId: () => set({uploadedDocId: null})


    })

)


export {useAuthStore, useDocumentStore}