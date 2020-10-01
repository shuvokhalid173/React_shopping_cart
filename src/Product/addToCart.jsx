import React, { Component } from 'react';

class AddToCart extends Component {

    render() { 
        if (!this.props.isClickedAddToButton) {
            return ( 
                <button 
                    className="btn btn-primary"
                    onClick={() => this.props.onClickAddToCart(this.props.product)}
                >
                    Add to cart
                </button>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-md-3">
                        <button className="btn btn-success">+</button>
                    </div>
                    <div className="col-md-6">
                        <input value={this.props.addedToCart} type="text" disabled className="form-control"/>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-success">-</button>
                    </div>
                </div>
            )
        }
    }
}
 
export default AddToCart;