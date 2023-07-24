import { useEffect, useRef, useState } from "react";
import buttonStyle from './Vote.module.css';
import { voteComment } from "../../../services/post/PostServices";


export default function useVote(initialNetVotes: number, darkBg: boolean = false, postId: string, commentId?: string) {
    const [ vote, setVote ] = useState(0);
    const [ netVotes, setNetVotes ] = useState(initialNetVotes);
    
    const upvoteElement = useRef<SVGSVGElement>(null);
    const downvoteElement = useRef<SVGSVGElement>(null);
    
    let voteClassName = 'vote-button';
    let activeClassName = 'active-vote-button';

    if (darkBg) {
        voteClassName += '-dark';
        activeClassName += '-dark';
    }
        
    const voteButtonClass = buttonStyle[voteClassName];
    const activeButtonClass = buttonStyle[activeClassName]; 

    useEffect(updateStyle, [vote]);
    
    return { handleVote, netVotes, upvoteElement, downvoteElement };

    function handleVote(myVote: number) {

        if (vote === myVote)
            return removeVote();

        setVote(myVote);
        setNetVotes(initialNetVotes + myVote);

        function removeVote() {
            setVote(0);
            setNetVotes(initialNetVotes);
        }
    }


    function updateStyle() {
        addVoteButtonClass(upvoteElement);
        addVoteButtonClass(downvoteElement);
        addActiveVoteButtonClass();

        function addVoteButtonClass(element: React.RefObject<SVGSVGElement>) {
            if (element.current && !element.current.classList.contains(voteButtonClass)) {
                element.current.classList.add(voteButtonClass);
            }
        }
        
        function addActiveVoteButtonClass() {
            downvoteElement.current?.classList.remove(activeButtonClass);
            upvoteElement.current?.classList.remove(activeButtonClass);

            if (vote === 1)
                upvoteElement.current?.classList.add(activeButtonClass);
            else if(vote === -1)
                downvoteElement.current?.classList.add(activeButtonClass)
        }
    }
}
