import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './ContactData.css';
import axios from '../../../hoc/axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../.././../components/UI/Input/Input';

class ContactData extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderForm:{
                name:this.getObject('input','Your name',{required:true}),
                email:this.getObject('input','Your email',{required:true}),
                street:this.getObject('input','Street',{required:true}),
                zipCOde:this.getObject('input','Zip code',{required:true, minLength:6, maxLength:6}),
                country:this.getObject('input','Country',{required:true}),
                deliveryMethod:{
                                elementType:'select',
                                elementConfig:{
                                    options:[
                                        {value:'fastest', displayValue:'Fastest'},
                                        {value:'cheapest', displayValue:'Cheapest'},
                                    ]
                                },
                                value:'fastest',
                                validation:{},
                                valid:true
                            }
            },
            loading:false,
            formIsvalid:false
        }

    }

    getObject = (eType,placeholder,validations)=>{
        const obj = {
            elementType:eType,
            elementConfig:{
                type:'text',
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

        return isValid;
    }

    inputChangedHandler =(event, inputIdentifier)=>{
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};  
        // elementConfig still points to state variable, but it is not needed and we will not use it. 
        //just the value property will suffice.

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsvalid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsvalid = updatedOrderForm[inputIdentifier].valid && formIsvalid;
        }
        this.setState({orderForm:updatedOrderForm, formIsvalid:formIsvalid}); 
    }

    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({loading:true})
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            orderData:formData
        }
        axios.post("/orders.json",order)
            .then(response=>{
                console.log(response)
                this.setState({loading:false})
                this.props.history.push('/');
            })
            .catch(err=>{console.log(err); this.setState({loading:false})});
    }
    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement=>{
                    return (<Input 
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                key={formElement.id} 
                                changed={(event)=>this.inputChangedHandler(event,formElement.id)} />)
                })}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsvalid}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={cssClasses.ContactData}>
                <h4>Add your Contact Data</h4>
                {form}
            </div>
        );

        }
    }

export default ContactData;