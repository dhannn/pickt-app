import React, { createContext, useContext } from "react";
import { User } from "../types/User";


type UserAuthState = {
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
};

const UserAuthContext = createContext<UserAuthState | undefined>(undefined);

export function useUserAuth() {
    return UserAuthContext;
}

export function UserAuthProvider(props: { children: React.ReactNode }) {
    const { children } = props;
    // <UserAuthContext.Provider value={}>

    // return (
    //     <UserAuthContext.Provider>  
    // );
}
