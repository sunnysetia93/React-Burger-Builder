import React from 'react';
import cssClasses from './NavigationItem.css';
const navigationItem = (props) => (
    <li className={cssClasses.NavigationItem}>
        <a 
            className={props.active ? cssClasses.active : null}
            href={props.link}>{props.children}</a>
    </li>
)

export default navigationItem;