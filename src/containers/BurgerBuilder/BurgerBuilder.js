import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Aux from '../../hoc/Auxiliary';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{
    
    // constructor(props){
    //     super(props);
    //     this.state={}
    // }
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:false
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
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls 
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsDeleted={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;