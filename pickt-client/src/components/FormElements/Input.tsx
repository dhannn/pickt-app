import React from 'react';
import formStyles from './FormElements.module.css'
import globalStyles from './../../index.module.css'

type InputProps = {
    type?: string
    classNames?: string
    width?: number
}

export default function Input(props: InputProps) {
    const { classNames, type } = props;
    const css = `${globalStyles['rounded-5px']} ${formStyles['input']} ${formStyles['formElements']}`;

    return (
        <input className={ classNames + ' ' + css} type={type === undefined? 'text': type}></input>
    );
}

