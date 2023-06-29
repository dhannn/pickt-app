import { useRef, useState } from "react";

export function useSearch(searchFn: Function) {
    const searchBarRef = useRef<HTMLInputElement>(null);
    const [ term, setTerm ] = useState('');

    return { searchBarRef, term, search };

    function search() {
        const searchTerm = searchBarRef.current?.value;
        setTerm(searchTerm!);
        return searchFn(term);
    }
}
