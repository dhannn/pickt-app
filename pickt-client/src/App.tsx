import React from "react";
import Button from "./components/Button/Button";
import Label from "./components/FormElements/Label";
import TextArea from "./components/FormElements/TextArea";
import { Input, Select } from "./components/FormElements";
import { CreatePostForm } from "./components/Forms";

export function App() {
    return (
    <>
        <CreatePostForm isFormFocused={true}></CreatePostForm>
    </>
    );
}
