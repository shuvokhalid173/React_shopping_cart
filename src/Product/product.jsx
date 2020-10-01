import React, { Component } from 'react';
import AddToCart from './addToCart';

class Product extends Component {
    // state = { 
    //     isClickedAddToButton: false, 
    //     addedToCart: 0
    // }

    // onClickAddToCart = (product) => {
    //     console.log(product); 
    //     this.setState({
    //         isClickedAddToButton: true, 
    //         addedToCart: 1
    //     }) 
    // }

    render() { 
        const {products} = this.props; 
        return ( 
            <div className="row">
                {products.map((item) => {
                    return (
                        <div key={item._id} className="col-md-4">
                            <div className="card" style={{width: "18rem"}}>
                                <img className="card-img-top" src={'/assets/' + item.image} alt="Card image cap" height="140px"/>
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">This is {item.category.name}. Price is {item.price}</p>
                                    {/* <AddToCart 
                                        product={item}
                                        isClickedAddToButton={this.state.isClickedAddToButton}
                                        addedToCart={this.state.addedToCart}
                                        onClickAddToCart={this.onClickAddToCart}
                                    /> */}

                                    {this.props.currentUser ? <div>{
                                        (this.props.currentProduct.indexOf(item) != -1 && this.props.isCartClicked ? (
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <button onClick={()=>this.props.onDecAddToCart(item)} className="btn btn-success">-</button>
                                                </div>
                                                <div className="col-md-6">
                                                    <input style={{textAlign: 'center'}} type="text" value={this.props.currentCartValue[item._id]} disabled className="form-control"/>
                                                </div>
                                                <div className="col-md-3">
                                                    <button onClick={()=>this.props.onIncAddToCart(item)} className="btn btn-success">+</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button className="btn btn-primary" onClick={()=>this.props.onAddToCartClick(item)}>Add to cart</button>
                                        ))
                                    }</div> : <div></div>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}
 
export default Product;