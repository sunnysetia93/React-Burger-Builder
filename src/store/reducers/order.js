import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders:[],
    loading:false,
    purchased:false
}
const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased:false
            }
        case actionTypes.PURCHASE_BURGER_START:
            console.log(action);
            return {
                ...state,
                loading:true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id:action.orderId
            }
            console.log(newOrder);
            return {
                ...state,
                loading:false,
                purchased:true,
                orders:state.orders.concat(newOrder)
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading:false
            };
        case actionTypes.FETCH_ORDERS:
            return {
                ...state,
                orders:action.fetchedOrders,
                loading:false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading:false
            }
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading:true
            }
        default:
            return state;
    }
}

export default reducer;