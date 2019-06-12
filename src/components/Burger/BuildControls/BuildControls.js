import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import cssClasses from './BuildControls.css'

const controls = [
    {label:'Salad', type: 'salad'},
    {label:'Bacon', type: 'bacon'},
    {label:'Meat', type: 'meat'},
    {label:'Cheese', type: 'cheese'}
];
const buildControls = (props) => (

    <div className={cssClasses.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>{
            return <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label}
                        added={()=>props.ingredientsAdded(ctrl.type)}
                        deleted={()=>props.ingredientsDeleted(ctrl.type)}
                        disabled={props.disabled[ctrl.type]} />
        })}
        <button 
                className={cssClasses.OrderButton}
                disabled={!props.purchasable}>Order Now</button>
    </div>
)

export default buildControls;