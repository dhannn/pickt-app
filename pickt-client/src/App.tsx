import React from "react";
import FormButton from "./components/Button/FormButton";

export function App() {
    return (<FormButton value={"Create"} onClick={function (event: React.FormEvent<HTMLInputElement>): void {
        event.preventDefault(); console.log('Clicked!');
    } }/>);
}
