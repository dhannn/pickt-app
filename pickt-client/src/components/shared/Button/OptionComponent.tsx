import { IconDefinition, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { useRef } from "react";
import React from "react";

import buttonStyles from './Button.module.css';

type Option = {
    name: string,
    icon?: IconDefinition,
    onClick: Function
}

type OptionProps = {
    options: Option[]
};

export function OptionComponent(props: OptionProps) {
    
    const moreOptions = useRef<HTMLDialogElement>(null);
    const optionComponents = props.options.map(renderOptionComponent)
    
    return (
        
        <>
            <Button classNames={buttonStyles['option-icon']} type='secondary' onClick={toggleOptionMenu}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </Button>
            
            <dialog className={buttonStyles['option-dialog']} ref={moreOptions}>
                { optionComponents }
            </dialog>
        </>
    );

    function toggleOptionMenu() {
        moreOptions.current?.checkVisibility()? moreOptions.current?.close(): moreOptions.current?.show()
    }

    function renderOptionComponent(option: Option) {
        return (
            <Button type='secondary' style={{ fontSize: 'var(--small-font-size)' }} value={option.name} onClick={() => onClickOption(option.onClick) }>
                {option.icon? <FontAwesomeIcon icon={option.icon} />: <></>}
            </Button>
        );
    }

    function onClickOption(optionOnClick: Function) {
        optionOnClick();
        moreOptions.current?.close();
    }
}