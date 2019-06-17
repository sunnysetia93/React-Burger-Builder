import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar'

import cssClasses from './Layout.css'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state={
        showSideDrawer:false
    }
    sideDrawerClosedHandler = ()=>{
        this.setState({showSideDrawer:false})
    }
    toggleMenu = ()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        });
    }
    render(){
        return (
            <Aux>
                <Toolbar toggleMenu={this.toggleMenu} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={cssClasses.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}; 

export default Layout;