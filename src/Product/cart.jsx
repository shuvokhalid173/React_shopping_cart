import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 

class Cart extends Component {
    state = {  }
    render() { 
        const {state: data} = this.props.location; 
        const totalItemsInCart = data.totalItemsInCart; 
        const totalItemsValueInCart = data.totalItemsValueInCart; 
        let totalPrice = 0; 
        for (let i = 0; i < totalItemsInCart.length; i++) {
            totalPrice += (totalItemsInCart[i].price * totalItemsValueInCart[totalItemsInCart[i]._id]);
        }
        return ( 
            <div className="container">
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
                <div style={{float: "right"}}>
                    <Link className="btn btn-success" to={{
                        pathname: "/shipping-form", 
                        state: {
                            totalItems: totalItemsInCart, 
                            totalItemsValue: totalItemsValueInCart, 
                            totalPrice: totalPrice
                        }
                    }}>Check out</Link>
                </div>
            </div>
        );
    }
}
 
export default Cart;