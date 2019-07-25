import React, {Component} from 'react';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Aux from '../../hoc/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../hoc/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions/actionTypes';

class BurgerBuilder extends Component{
    
    state = {
        ingredients:null,
        totalPrice:4,
        purchasing:false,    // order now button clicked for showing modal
        loading:false,
        error:false
    }
    componentDidMount(){
        axios.get('/ingredients.json')
            .then(response=>{
                this.setState({ingredients:response.data})
            })
            .catch(err=>this.setState({error:true}));
    }

    // addIngredientHandler = (type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;

    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }

    //     updatedIngredients[type]=updatedCount;
        
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = priceAddition + oldPrice;
        
    //     this.setState({ingredients: updatedIngredients, totalPrice:newPrice});
    //     this.updatePurchaseState(updatedIngredients);

    // }

    // removeIngredientHandler = (type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount>0){
    //         const updatedCount = oldCount-1;

    //         const updatedIngredients = {
    //             ...this.state.ingredients
    //         };

    //         updatedIngredients[type]=updatedCount;
    //         const priceSub = INGREDIENT_PRICES[type];
    //         const oldPrice = this.state.totalPrice;
    //         const newPrice = oldPrice - priceSub;

    //         this.setState({ingredients:updatedIngredients,totalPrice:newPrice})
    //         this.updatePurchaseState(updatedIngredients);
    //     }
    //     else
    //         return;
    // }

    updatePurchaseState = (ingredients)=>{
        const sum = Object.keys(ingredients)
                    .map(igKey=>{
                        return ingredients[igKey]
                    })
                    .reduce((prev,curr)=>{
                        return prev+curr;
                    },0)
        return sum>0;
    }

    purchaseHandler = ()=>{
        this.setState({purchasing:true})
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () =>{
        // alert('You continue!');
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout'
            // search: '?' + queryString
        })
    }
    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        let orderSummary =  null;
        let burger = this.state.error ? <p>Ingredients can't be loaded !</p> : <Spinner />

        if(this.props.ings){
            burger= <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BurgerControls 
                        ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsDeleted={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler} />
                </Aux>

            orderSummary = <OrderSummary 
            ingredients={this.props.ings} 
            cancel={this.purchaseCancelHandler} 
            price={this.props.price}
            continue={this.purchaseContinueHandler}/>

            if(this.state.loading){
                orderSummary = <Spinner />
            }
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}
const mapStateToProps = state =>{
    return {
        ings:state.ingredients,
        price:state.totalPrice
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));