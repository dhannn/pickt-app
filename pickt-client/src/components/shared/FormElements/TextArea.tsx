import React, { ReactNode, forwardRef } from 'react';
import formStyles from './FormElements.module.css'
import globalStyles from './../../../index.module.css'

type TextAreaProps = {
    classNames?: string,
    style?: React.CSSProperties,
    required?: boolean,
    children?: ReactNode | string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>( 
    function (props: TextAreaProps, ref) {
        const { classNames, style, required, children } = props;
        const classes = [
            globalStyles['rounded-5px'],
            formStyles['textarea'], 
            formStyles['formElements'],
            classNames
        ].join(' ');

        return (
            <textarea 
                ref={ ref } 
                required={ required } 
                className={ classes } style={ style }>{ children }</textarea>
        );
    }
)

export default TextArea;

