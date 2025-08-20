import { AuthStateType } from "@/types/types";
import {create} from "zustand";
import {persist, PersistOptions} from "zustand/middleware";

type AuthPersist = PersistOptions<AuthStateType>;

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


export {useAuthStore}