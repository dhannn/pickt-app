import React from "react";
import Button from "./components/Button/Button";

export function App() {
    return (
    <>
        <Button type='primary' value={'Create'} onClick={function (): void {
            console.log('Clicked!');
        } }/>
        <Button type='secondary' value={'Cancel'} onClick={function (): void {
            console.log('Clicked!');
        } }/>
    </>
    );
}
