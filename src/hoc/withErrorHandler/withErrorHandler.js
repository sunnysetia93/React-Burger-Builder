import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error:null
        }
        // IN CASE there is an error 
        //componentDidMount was change to componentWillMount as after child Components get rendered then
        // componentDidMount of this component will run which will get error before displaying it as a modal
        componentWillMount(){
            this.reqInterceptors = axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            })
            this.resInterceptors= axios.interceptors.response.use(res=>res,err=>{
                this.setState({error:err});
            })
        }

        // to avoid multiple interceptors when this component is used again n again
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        errorConfirmedHanlder = ()=>{
            this.setState({error:null})
        }
        render(){
            return (
                <Aux>
                    <Modal show={this.state.error}
                            modalClosed={this.errorConfirmedHanlder}>
                        {this.state.error ? this.state.error.message  : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;