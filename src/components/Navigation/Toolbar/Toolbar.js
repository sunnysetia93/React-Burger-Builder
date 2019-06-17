import React from 'react';
import Logo from '../../Logo/Logo'
import cssClasses from './Toolbar.css'
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
    <header className={cssClasses.Toolbar}>
        <DrawerToggle toggle={props.toggleMenu} />
        <div className={cssClasses.Logo}>
                <Logo />
        </div>
        <nav className={cssClasses.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default Toolbar;