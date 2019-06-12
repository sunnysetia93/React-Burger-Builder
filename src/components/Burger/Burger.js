import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import cssClasses from './Burger.css'
const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientKey =>{
            return [...Array(props.ingredients[ingredientKey])].map((_,i)=>{
                return <BurgerIngredient key={ingredientKey+i} type={ingredientKey} />;
            })
        })
        .reduce((prev,curr)=>{
            return prev.concat(curr);
        },[]);

    if(transformedIngredients.length===0){
        transformedIngredients=<p>Please start adding ingredients!</p>
    }
    return (
        <div className={cssClasses.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );

}

export default burger;