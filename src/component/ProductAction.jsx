import React, { Component } from 'react';
import axios from 'axios'; 
import { Link, NavLink } from 'react-router-dom';

axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token'); 

class ProductAction extends Component {
    state = { 
        allProduct: []
    }

    async componentDidMount() {
        try {
            const products = await axios.get('http://localhost:1111/product');
            this.setState({
                allProduct: products.data
            })
        } catch (error) {
            
        }
    }

    onDeleteProduct = async (id) => {
        const tempProducts = this.state.allProduct; 
        try {
            const allProduct = this.state.allProduct.filter(item => item._id != id); 
            this.setState({
                allProduct: allProduct
            })
            const result = await axios.delete('http://localhost:1111/product/' + id);
            console.log(result);  
        } catch (error) {
            this.setState({
                allProduct: tempProducts
            })
        }
    }

    render() { 
        console.log(this.state.allProduct); 
        
        return (
             <div>
                <NavLink className="btn btn-primary" to="/product/new">Create new</NavLink> 
                <table className="table">
                    <thead>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {this.state.allProduct.map(product => {
                            return (
                                <tr key={product._id}>
                                    <td style={{width: '80px'}}>
                                        <img className="card-img-top" src={'/assets/' + product.image} alt="Card image cap" height="60px"/>
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.category.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <NavLink className="btn btn-success" to={`/product/${product._id}`}>Update</NavLink>
                                        <button onClick={()=>this.onDeleteProduct(product._id)} style={{marginLeft: "5px"}} className="btn btn-danger">Detele</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
             </div>
        );
    }
}
 
export default ProductAction;