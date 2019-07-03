import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './ContactData.css';
import axios from '../../../hoc/axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../.././../components/UI/Input/Input';
class ContactData extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderForm:{
                name:this.getObject('input','Your name'),
                email:this.getObject('input','Your email'),
                street:this.getObject('input','Street'),
                zipCOde:this.getObject('input','Zip code'),
                country:this.getObject('input','Country'),
                deliveryMethod:{
                                elementType:'select',
                                elementConfig:{
                                    options:[
                                        {value:'fastest', displayValue:'Fastest'},
                                        {value:'cheapest', displayValue:'Cheapest'},
                                    ]
                                },
                                value:''
                            }
            },
            loading:false
        }

    }

    getObject = (eType,placeholder)=>{
        const obj = {
            elementType:eType,
            elementConfig:{
                type:'text',
                placeholder:`${placeholder}`
            },
            value:''
        }
        return obj
    }

    inputChangedHandler =(event, inputIdentifier)=>{
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};  
        // elementConfig still points to state variable, but it is not needed and we will not use it. 
        //just the value property will suffice.

        updatedFormElement.value = event.target.value;

        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm:updatedOrderForm}); 
    }

    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({loading:true})
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
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
            .then(response=>{
                console.log(response)
                this.setState({loading:false})
                this.props.history.push('/');
            })
            .catch(err=>{console.log(err); this.setState({loading:false})});
        console.log(this.props.ingredients);
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
            <form className={cssClasses.Form}>
                {formElementArray.map(formElement=>{
                    return (<Input 
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                key={formElement.id} 
                                changed={(event)=>this.inputChangedHandler(event,formElement.id)} />)
                })}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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