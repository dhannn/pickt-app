import React from "react";
import { UserLoginForm } from "../components/Forms/UserLoginForm";
import { NavBar } from "../components/shared/Layout/NavBar";

export function Login() {
    return (
        <>
            <NavBar/>
            <UserLoginForm/>
        </>
    )
}