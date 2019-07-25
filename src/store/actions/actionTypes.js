export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';


export const add = (ingName) =>{
    return {
        type:ADD_INGREDIENT,
        ingredientName:ingName
    }
}

export const remove = (ingName) =>{
    return {
        type:REMOVE_INGREDIENT,
        ingredientName:ingName
    }
}