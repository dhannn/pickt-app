import React from "react";
import './highlight.css';
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export interface HighlightProperties {
    photo: string;
    description: string;
    isActive: boolean;
}

export function HighlightComponent (props: HighlightProperties) {

    const { photo: link, description, isActive } = props;

    const divClass = isActive ? 'highlight-hidden' : '';
    const navigate = useNavigate()
    return (
        <div className={`daily-highlight-container ${divClass}`} style={{backgroundImage: `url(${link})`}}>
            <a href="post">
                <h2 className="daily-highlight-header">Daily Highlight</h2>
                <p className="daily-highlight-description">
                    {description}
                    <Button type='primary' onClick={(e) => {
                        e.preventDefault();

                        const highlight = document.querySelector('.daily-highlight-container');
                        if (highlight?.classList.contains('full')) {
                            document.querySelector('.daily-highlight-container')?.classList.remove('full');
                        } else {
                            document.querySelector('.daily-highlight-container')?.classList.add('full');
                        }
                    }}>Toggle Full Image</Button>
                    <Button type='secondary' onClick={(e) => {
                        e.preventDefault();
                        navigate('post/need-feedback-portrait-composition');
                    }}>See Original Post</Button>
                </p>
            </a>
        </div>
    );
}
