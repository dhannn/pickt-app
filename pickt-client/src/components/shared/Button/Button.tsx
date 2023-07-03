import React, { MouseEventHandler, ReactNode } from "react";
import btnStyles from './Button.module.css';
import styles from './../../../index.module.css';

type FormButtonProps = {
    type: string,
    classNames?: string,
    value?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>
    style?: React.CSSProperties,
    children?: ReactNode,
    disabled?: boolean
};

export default function Button(props: FormButtonProps) {
    const { classNames, value, onClick, type, style, children, disabled } = props;

    const classes = [
            classNames?? '', 
            btnStyles['button'], 
            btnStyles[type + '-button'], 
            styles['rounded-5px']
        ].join(' ');

    return (
        <button 
            style={style} 
            className={classes} 
            value={value} 
            onClick={onClick}
            disabled={disabled}
        >
            {children} {value}
        </button>
    );
}
