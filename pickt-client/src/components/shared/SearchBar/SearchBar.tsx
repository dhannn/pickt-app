import React, { useRef } from "react";
import { Input } from "../FormElements";

import searchbarStyles from './SearchBar.module.css';
import globalStyles from './../../../index.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export function SearchBar() {

    const searchBarRef = useRef<HTMLInputElement>(null);
    
    return (
        <div className={`${searchbarStyles['search-bar-container']}`}>
            <Input
                ref={searchBarRef}
                classNames={`${globalStyles['rounded-20px']} ${searchbarStyles['search-bar-input']}`}
            />
            <FontAwesomeIcon 
                icon={faMagnifyingGlass} 
                className={`${searchbarStyles['search-bar-icon']}`}
                onClick={handleClick}
            />    
        </div>
    );

    function handleClick() {
        const searchbarInput = searchBarRef!.current;
        
        if (!searchbarInput?.classList.contains(searchbarStyles['active']))
            return searchbarInput!.classList.add(searchbarStyles['active']);
        
        searchbarInput!.classList.remove(searchbarStyles['active'])
    }
}