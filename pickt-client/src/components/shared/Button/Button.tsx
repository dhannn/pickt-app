import React, { MouseEventHandler } from "react";
import btnStyles from './Button.module.css';
import styles from './../../../index.module.css';

type FormButtonProps = {
    type: string,
    classNames?: string,
    value: string,
    onClick: MouseEventHandler<HTMLButtonElement>
    style?: React.CSSProperties
};

export default function Button(props: FormButtonProps) {
    const { classNames, value, onClick, type, style } = props;

    const styleClass = `${btnStyles['button']} ${btnStyles[type + '-button']} ${styles['rounded-5px']}`;

    return (
        <button style={style} className={classNames + ' ' + styleClass} value={value} onClick={onClick}>{value}</button>
    );
}
