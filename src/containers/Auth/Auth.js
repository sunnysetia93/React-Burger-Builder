import React from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import cssClasses from './Auth.css';
import * as actionCreators from '../../store/actions';

class Auth extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            controls:{
                email:this.getObject('input','email','Email Address',{required:true,isEmail:true}),
                password:this.getObject('input','password','Password',{required:true,minLength:6})
    
            }
        }
    }
    getObject = (eType,configType,placeholder,validations)=>{
        const obj = {
            elementType:eType,
            elementConfig:{
                type:configType,
                placeholder:`${placeholder}`
            },
            value:'',
            validation:validations,
            valid:false,
            touched:false
        }
        return obj
    }
    checkValidity(value,rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <=rules.maxLength && isValid;
        }

        if(rules.isEmail){
            const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid;
        }

        if(rules.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event,controlName)=>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        }

        this.setState({
            controls:updatedControls
        })
    }

    submitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value)
    }
    render(){
        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        const form = formElementArray.map(formElement=>(
            <Input 
                    key={formElement.id} 
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event)=>this.inputChangedHandler(event,formElement.id)} />
        ))
        return (
            <div className={cssClasses.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
        );

    }
}

const mapStateToProps = state =>{
    return {

    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth : (email,password)=>dispatch(actionCreators.auth(email,password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);