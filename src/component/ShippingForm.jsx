import React, { Component } from 'react';
import axios from 'axios'; 

class ShippingForm extends Component {
    state = { 
        city: "", 
        street: "", 
        phone: ""
    }

    onInputChange = (e) => {
        const name = e.currentTarget.name; 
        const value = e.currentTarget.value; 

        this.setState({
            [name]: value
        })
    }

    onFormSubmit = async (e) => {
        e.preventDefault(); 
        const data = {
            ...this.state, 
            user: this.props.user.email, 
            items: this.getPreparedItems(), // total items should be [{product: "", quantity: 3}, {}] this pattern 
            date: this.getTodaysDate(), 
            grandTotal: this.props.location.state.totalPrice, 
            status: false
        }; 
        console.log(data);
        
        try {
            const datas = await axios.post('http://localhost:1111/shipping', data, {}); 
            window.location = '/'; 
            // alert('successfully ordered'); 
            // this.props.history.push('/'); 
        } catch (error) {
            console.log(error); 
        }
    }

    getPreparedItems = () => {
        const items = this.props.location.state.totalItemsValue; 
        console.log(items); 
        let preparedItems = []; 

        for (let key in items) {
            if (items[key] > 0) {
                preparedItems.push({
                    product: key, 
                    quantity: items[key]
                });
            } 
        }

        return preparedItems; 
    }

    getTodaysDate = () => {
        const d = new Date(); 
        let day = d.getDate(); 
        let month = d.getMonth() + 1; 
        let year = d.getFullYear(); 

        if (day < 10) {
            day = "0" + day; 
        }
        
        if (month < 10) {
            month = "0" + month; 
        }

        return `${year}-${month}-${day}`; 
    }

    render() { 
        console.log(this.props.user); 
        const {state: data} = this.props.location; 
        const totalItemsInCart = data.totalItems; 
        const totalItemsValueInCart = data.totalItemsValue; 
        let totalPrice = 0; 
        for (let i = 0; i < totalItemsInCart.length; i++) {
            totalPrice += (totalItemsInCart[i].price * totalItemsValueInCart[totalItemsInCart[i]._id]);
        }
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>ShippingForm</h2>
                        <div>
                            <form className="form" onSubmit={this.onFormSubmit}>
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input onChange={this.onInputChange} value={this.state.city} type="text" name="city" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="street">Street</label>
                                    <input value={this.state.street} onChange={this.onInputChange} name="street" type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" name='phone' onChange={this.onInputChange} value={this.state.phone} className="form-control"/>
                                </div>
                                <button className="btn btn-primary">Done</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2>Cart details</h2>
                        <table className="table">
                            <thead>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total price</th>
                            </thead>
                            <tbody>
                                {
                                    totalItemsInCart.map(item => {
                                        return (
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{item.category.name}</td>
                                                <td>{item.price}</td>
                                                <td>{totalItemsValueInCart[item._id]}</td>
                                                <td>{item.price + ' * ' + totalItemsValueInCart[item._id] + ' = ' + parseInt(item.price) * parseInt(totalItemsValueInCart[item._id])}</td>
                                            </tr>
                                        ); 
                                    })
                                }
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Grand total</td>
                                    <td>{totalPrice}Tk</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ShippingForm;