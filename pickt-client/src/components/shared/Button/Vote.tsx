import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import useVote from "./useVote"
import React from "react";
import buttonStyles from './Button.module.css'

type VoteProps = {
    upvotes: number,
    downvotes: number
}

export function Vote(props: VoteProps) {
    const { upvotes, downvotes } = props;
    const initialNetVotes = upvotes - downvotes;

    const { netVotes, handleVote, upvoteElement, downvoteElement } = useVote(initialNetVotes);

    return (
        <div className={`${buttonStyles['vote']}`}>
            <FontAwesomeIcon ref={upvoteElement} icon={solid("caret-up")} onClick={() => handleVote(+1)} />
            <p  className={`${buttonStyles['vote-count']}`}>
                {netVotes}
            </p>
            <FontAwesomeIcon ref={downvoteElement} icon={solid("caret-down")} onClick={() => handleVote(-1)} />
        </div>
    );
}
