import React, {Component} from 'react';
import {connect} from 'react-redux'
import Order from '../../components/Order/Order';
import axios from '../../hoc/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders:[],
        loading:true
    }

    componentDidMount(){
        this.props.fetchOrders();
        // axios.get('/orders.json')
        //     .then((response)=>{
                
        //         const fetchedOrders = [];
        //         for(let key in response.data){
        //             fetchedOrders.push({...response.data[key], id:key});
        //         }
        //         this.setState({loading:false, orders:fetchedOrders});
        //         console.log(this.state)
        //     })
        //     .catch(err=> this.setState({loading:true}));  
    }

    render(){
        let orders = <Spinner />;
        if(!this.props.loading){
            orders = (
                this.props.orders.map(order=>{
                    return <Order 
                                key={order.id}
                                ingredients={order.ingredients}
                                price={order.price}/>
                })
            )
        }
        return (
            <div>
                {orders}
            </div>
        );

    }
}

const mapStateToProps = state=>{
    return {
        orders:state.ord.orders,
        loading:state.ord.loading
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        fetchOrders : () => dispatch(actionCreators.fetchOrders())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));