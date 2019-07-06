import React from 'react';
import cssClasses from './Input.css'

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [cssClasses.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(cssClasses.Invalid);
        validationError = <p className={cssClasses.ValidationError}>Please enter a valid value!</p>;

    }
    switch(props.elementType){
        case('input'):
            inputElement = <input className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                onChange={props.changed}
                                value={props.value}/>
            break;
        case('select'):
            inputElement = (<select 
                                className={inputClasses.join(' ')} 
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
            inputElement = <input className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                onChange={props.changed}
                                value={props.value} />
            break;
    }
    return (
        <div className={cssClasses.Input}>
            <label className={cssClasses.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;