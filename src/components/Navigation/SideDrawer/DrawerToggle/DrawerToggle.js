import React from 'react';
import cssClasses from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={cssClasses.DrawerToggle} onClick={props.toggle}>
        <div></div>
        <div></div>
        <div></div>

    </div>
)

export default drawerToggle;