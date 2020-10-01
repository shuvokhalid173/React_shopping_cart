import React, { Component } from 'react';
import Category from './category';
import Product from './product';

class ProductComponent extends Component {
    render() { 
        // for (let i = 0; i < this.state.currentProduct.length; i++) {
        //     console.log(this.state.currentProduct[i].name + '  ' + *[this.state.currentProduct[i]._id]); 
        // }
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Category 
                            categories={this.props.categories}
                            selecetedCategory={this.props.selecetedCategory}
                            onCategoryClick={this.props.onCategoryClick}
                        />
                    </div>
                    <div className="col-md-9">
                        <Product 
                            products = {this.props.products}
                            currentProduct = {this.props.currentProduct}
                            isCartClicked = {this.props.isCartClicked}
                            currentCartValue = {this.props.currentCartValue}
                            onAddToCartClick = {this.props.onAddToCartClick}
                            onIncAddToCart = {this.props.onIncAddToCart}
                            onDecAddToCart = {this.props.onDecAddToCart}
                            currentUser = {this.props.currentUser}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ProductComponent;