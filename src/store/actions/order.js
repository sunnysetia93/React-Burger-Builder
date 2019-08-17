import * as actionTypes from './actionTypes';
import axios from '../../hoc/axios-orders';

export const purchaseBurgerSuccess = (id,orderData)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    };
}

export const purchaseBurgerFail = (error)=>{
    console.log(error)
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    };
}

export const purchaseBurgerStart = ()=>{
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData)=>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json",orderData)
            .then((response)=>{
                const data = response["data"];
                const id = data["name"];
                console.log(data)
                dispatch(purchaseBurgerSuccess(id,orderData));
            })
            .catch(err=>{
                dispatch(purchaseBurgerFail(err))
            });
    }   
}

export const purchaseInit = ()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
}

export const setOrders = (fetchedOrders) =>{
    return {
        type:actionTypes.FETCH_ORDERS,
        fetchedOrders:fetchedOrders
    }
}

export const fetchOrdersFail = ()=>{
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        loading:true
    }
}

export const fetchOrdersStart = ()=>{
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = ()=>{
    return dispatch =>{
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
            .then((response)=>{
                    
                const fetchedOrders = [];
                for(let key in response.data){
                    fetchedOrders.push({...response.data[key], id:key});
                }
                dispatch(setOrders(fetchedOrders))
            })
            .catch(err=> dispatch(fetchOrdersFail())); 
    }
}