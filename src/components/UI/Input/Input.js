import React from 'react';
import cssClasses from './Input.css'

const input = (props) => {
    let inputElement = null;
    switch(props.elementType){
        case('input'):
            inputElement = <input className={cssClasses.InputElement} 
                                {...props.elementConfig} 
                                onChange={props.changed}
                                value={props.value}/>
            break;
        case('select'):
            inputElement = (<select 
                                className={cssClasses.InputElement} 
                                value={props.value}
                                onChange={props.changed}>
                                {props.elementConfig.options.map(op=>{
                                    return <option 
                                                key={op.value} 
                                                value={op.value}>{op.displayValue}</option>
                                })}
                            </select>)
            break;
        default:
            inputElement = <input className={cssClasses.InputElement} 
                                {...props.elementConfig} 
                                onChange={props.changed}
                                value={props.value} />
            break;
    }
    return (
        <div className={cssClasses.Input}>
            <label className={cssClasses.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;