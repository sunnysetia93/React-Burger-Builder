import React, {Component} from 'react';
import cssClasses from './Modal.css'
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    
    // performance improvement - checks if props have changed and then only renders Modal & its children i.e. OrderSummary
    // OrderSummary will not render unncessarily as it is not shown in modal.
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show!==this.props.props;
    }

    render(){
        return (
            <Aux>   
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}></Backdrop>
                    <div 
                        className={cssClasses.Modal}
                        style={{
                            transform:this.props.show?'translateY(0)':'translateY(-100vh)',
                            opacity:this.props.show?'1':'0'
                    }}>
                        {this.props.children}
                    </div>
            </Aux>
        )
    }
    
}

export default Modal;