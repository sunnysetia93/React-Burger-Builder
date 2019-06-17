import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import cssClasses from './Logo.css'

const logo = (props) => (
    <div className={cssClasses.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
)

export default logo;