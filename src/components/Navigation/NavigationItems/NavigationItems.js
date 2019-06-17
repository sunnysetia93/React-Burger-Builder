import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import cssClasses from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={cssClasses.NavigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;