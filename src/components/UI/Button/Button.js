import React from 'react';
import cssClasses from './Button.css'

const button = (props) => ( 
    <button 
        className={[cssClasses.Button,cssClasses[props.btnType]].join(' ')} 
        onClick={props.clicked}
        disabled={props.disabled}>
            
        {props.children}
    </button>
)
export default button;