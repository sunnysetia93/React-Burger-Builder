import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import cssClasses from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={cssClasses.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;