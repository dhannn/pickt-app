import React from "react";
import { FormEventHandler } from "react";
import styles from './Button.module.css';

type FormButtonProps = {
    classNames?: string,
    value: string,
    onClick: FormEventHandler<HTMLInputElement>
};

export default function FormButton(props: FormButtonProps) {
    const { classNames, value, onClick } = props;

    return (
        <input type='submit' className={classNames + ' form-button'} value={value} onClick={onClick}/>
    );
}
