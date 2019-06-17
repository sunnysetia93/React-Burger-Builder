import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import cssClasses from './SideDrawer.css'
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';

const sideDrawer = (props) => {

    let attachedClasses = [cssClasses.SideDrawer, cssClasses.Close];

    if(props.open){
        attachedClasses = [cssClasses.SideDrawer, cssClasses.Open];
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/> 
            <div className={attachedClasses.join(' ')}>
                <div className={cssClasses.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );

}

export default sideDrawer;