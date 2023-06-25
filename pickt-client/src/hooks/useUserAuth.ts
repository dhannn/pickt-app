import React, { createContext, useContext } from "react";
import { User } from "../types/User";


export type UserAuthState = {
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
};

const UserAuthContext = createContext<UserAuthState | undefined>(undefined);

export function getUserAuthContext() {
    return UserAuthContext;
}

export function useUserAuth() {
    return useContext(UserAuthContext);
}

export function UserAuthProvider(props: { children: React.ReactNode }) {
    const { children } = props;
    // <UserAuthContext.Provider value={}>

    // return (
    //     <UserAuthContext.Provider>  
    // );
}
