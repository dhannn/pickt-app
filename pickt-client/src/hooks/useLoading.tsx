import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export function useLoading() {
    const [ isLoading, setLoading ] = useState(true);
    const loadingIcon = 
    <div style={{position: 'absolute', width: '100vw', height: '100vh', top: '0', zIndex: 3, backgroundColor: 'rgba(0, 0, 0, .8)', backdropFilter: 'blur(10px)'}}>
        <FontAwesomeIcon icon={faSpinner} spinPulse style={{fontSize: '5rem', position: 'relative', left: '45vw', top: '40%', color: 'var(--lavender)'}}/>
    </div>;

    // return {
    //     isLoading,
    //     setLoading,
    //     loadingIcon
    // }

    return {
        isLoading, setLoading, loadingIcon
    };
}
