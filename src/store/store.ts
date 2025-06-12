import { AuthStateType } from "@/types/types";
import {create} from "zustand";

const useAuthStore = create<AuthStateType>((set) => ({

    token: null,
    setToken: (token: string) => set({token}),
    clearToken: () => set({token: null})

}))


export {useAuthStore}