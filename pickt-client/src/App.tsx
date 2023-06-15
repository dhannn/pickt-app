import React from "react";
import Button from "./components/Button/Button";
import Label from "./components/FormElements/Label";
import TextArea from "./components/FormElements/TextArea";
import { Input } from "./components/FormElements";

export function App() {
    return (
    <>
        <div style={{width: '50%', margin: '10%'}}>
            <Label value='Title'/>
            <br/>
            <Input/>
            <br/>
            <Label value='Post'/>
            <TextArea height={30}/>
            <Button type='primary' value={'Create'} onClick={function (): void {
                console.log('Clicked!');
            } }/>
            <Button type='secondary' value={'Cancel'} onClick={function (): void {
                console.log('Clicked!');
            } }/>
        </div>
    </>
    );
}
