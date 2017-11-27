import React from 'react';
import './navbutton.css';

export default function NavButton (props) {
    const classModifier = props.classModifier;
    return <button 
            className={`navbutton ${classModifier ? 'navbutton--'+ classModifier : ''}`} 
            onClick={props.onClick}>
                {props.children}
            </button>
}