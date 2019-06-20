import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Aux from '../../hoc/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../hoc/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{
    
    state = {
        ingredients:null,
        totalPrice:4,
        purchasable:false,
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

    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type]=updatedCount;
        
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice
        const newPrice = priceAddition + oldPrice;
        
        this.setState({ingredients: updatedIngredients, totalPrice:newPrice});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount>0){
            const updatedCount = oldCount-1;

            const updatedIngredients = {
                ...this.state.ingredients
            };

            updatedIngredients[type]=updatedCount;
            const priceSub = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceSub;

            this.setState({ingredients:updatedIngredients,totalPrice:newPrice})
            this.updatePurchaseState(updatedIngredients);
        }
        else
            return;
    }

    updatePurchaseState = (ingredients)=>{
        const sum = Object.keys(ingredients)
                    .map(igKey=>{
                        return ingredients[igKey]
                    })
                    .reduce((prev,curr)=>{
                        return prev+curr;
                    },0)
        this.setState({purchasable:sum>0});
    }

    purchaseHandler = ()=>{
        this.setState({purchasing:true})
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () =>{
        // alert('You continue!');
        this.setState({loading:true})
        const order = {
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:"Sunny Setia",
                address:{
                    street:"testStreet 1",
                    zipCode:'110019'
                },
                email:"s@gmail.com"
            },
            deliveryMethod:'fastest'
        }
        axios.post("/orders.json",order)
            .then(response=>this.setState({loading:false, purchasing:false}))
            .catch(err=>{console.log(err); this.setState({loading:false, purchasing:false})});
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        let orderSummary =  null;
        let burger = this.state.error ? <p>Ingredients can't be loaded !</p> : <Spinner />

        if(this.state.ingredients){
            burger= <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BurgerControls 
                        ingredientsAdded={this.addIngredientHandler}
                        ingredientsDeleted={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler} />
                </Aux>
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients} 
            cancel={this.purchaseCancelHandler} 
            price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder,axios);