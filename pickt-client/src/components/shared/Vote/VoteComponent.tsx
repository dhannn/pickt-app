import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import useVote from "./useVote"
import React, { CSSProperties } from "react";
import buttonStyles from './Vote.module.css'
import { Vote } from "../../../types/Vote";

type VoteProps = {
    voteInfo: Vote,
    styles?: CSSProperties,
    darkBg?: boolean
}

export function VoteComponent(props: VoteProps) {
    const { voteInfo, styles, darkBg } = props;
    const { upvotes, downvotes } = voteInfo;
    const initialNetVotes = upvotes - downvotes;

    const { netVotes, handleVote, upvoteElement, downvoteElement } = useVote(initialNetVotes, darkBg);

    return (
        <div className={`${buttonStyles['vote']}`} style={styles}>
            <FontAwesomeIcon ref={upvoteElement} icon={solid("caret-up")} onClick={() => handleVote(+1)} />
            <p  className={`${darkBg? buttonStyles['vote-count-dark']: buttonStyles['vote-count']}`}>
                {netVotes}
            </p>
            <FontAwesomeIcon ref={downvoteElement} icon={solid("caret-down")} onClick={() => handleVote(-1)} />
        </div>
    );
}
