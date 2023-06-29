import React, { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';
import formStyles from './FormElements.module.css'
import globalStyles from './../../../index.module.css'

type InputProps = {
    type?: string
    classNames?: string
    style?: React.CSSProperties
    onFocus?: FocusEventHandler<HTMLInputElement>,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onBlur?: ChangeEventHandler<HTMLInputElement>,
    placeholder?: string
    required?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(function (props: InputProps, ref) {
    const { classNames, type, style, onFocus, onBlur, placeholder, required, onChange } = props;
    const inputClasses = [
        globalStyles['rounded-5px'],
        formStyles['input'],
        formStyles['formElements'],
        classNames
    ].join(' ');

    return (
        <input 
            onBlur={ onBlur } 
            ref={ ref } 
            required={ required } 
            className={ inputClasses } 
            type={ type === undefined? 'text': type } 
            style={ style } 
            onFocus={ onFocus } 
            onChange={ onChange }
            placeholder={ placeholder }
        />
    );
});

export default Input;
