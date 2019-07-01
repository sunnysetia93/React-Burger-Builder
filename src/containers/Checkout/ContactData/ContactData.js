import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './ContactData.css';
import axios from '../../../hoc/axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactData extends Component {

    state = {
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }
    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({loading:true})
        const order = {
            ingredients:this.state.ingredients,
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
        let form = (
            <form>
                <input type="text" className={cssClasses.Input} name="name" placeholder="Your name" />
                <input type="text" className={cssClasses.Input} name="email" placeholder="Your email" />
                <input type="text" className={cssClasses.Input} name="street" placeholder="Your Street" />
                <input type="text" className={cssClasses.Input} name="postal" placeholder="Your Postal Code" />
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