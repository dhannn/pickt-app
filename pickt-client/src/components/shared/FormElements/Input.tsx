import React, { FocusEventHandler } from 'react';
import formStyles from './FormElements.module.css'
import globalStyles from './../../../index.module.css'

type InputProps = {
    type?: string
    classNames?: string
    style?: React.CSSProperties
    onFocus?: FocusEventHandler<HTMLInputElement>
    placeholder?: string
    required?: boolean
}

export default function Input(props: InputProps) {
    const { classNames, type, style, onFocus, placeholder, required } = props;
    const css = `${globalStyles['rounded-5px']} ${formStyles['input']} ${formStyles['formElements']}`;

    return (
        <input required={required} className={ classNames + ' ' + css} type={type === undefined? 'text': type} style={style} onFocus={onFocus} placeholder={placeholder}></input>
    );
}

