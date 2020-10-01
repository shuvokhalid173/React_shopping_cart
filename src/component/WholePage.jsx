// import React, { Component } from 'react';
// import NavBar from './NavBar'; 
// import ProductComponent from '../Product/productComponent'; 
// import axios from 'axios';
// import Cart from '../Product/cart'; 
// import { Route, Switch, Redirect } from 'react-router-dom';

// class WholePage extends Component {
//     state = { 
//         categories: [], 
//         selecetedCategory: '0',
//         products: [], 
//         allProduct: [],
//         currentProduct: [], 
//         isCartClicked: false,
//         currentCartValue: []
//     }

//     async componentDidMount() {
//         const categories = await axios.get('http://localhost:1111/category');
//         const products = await axios.get('http://localhost:1111/product'); 
//         let currentCartValue = [];
//         // const {data: dataProducts} = products;  
//         // for (let i = 0; i < dataProducts.length; i++) {
//         //     currentCartValue[dataProducts[i]._id] = 0; 
//         // }
//         this.setState({
//             categories: categories.data, 
//             products: products.data, 
//             allProduct: products.data 
//             //currentCartValue: currentCartValue
//         }) 
//     }

//     onCategoryClick = (id) => {
//         if (id != '0') {
//             this.setState({
//                 selecetedCategory: id , 
//                 products: this.state.allProduct.filter(i => i.category._id == id)
//             }); 
//         } else {
//             this.setState({
//                 selecetedCategory: id , 
//                 products: this.state.allProduct
//             }); 
//         }
//     }

//     onAddToCartClick = (product) => {
//         let currentProductArray = this.state.currentProduct; 
//         currentProductArray.push(product);
//         let currentCartValue = this.state.currentCartValue; 
//         currentCartValue[product._id] = 1;  
//         this.setState({
//             currentProduct: currentProductArray, 
//             isCartClicked: true, 
//             currentCartValue: currentCartValue
//         })
//         console.log(this.state.currentProduct); 
//     }

//     onIncAddToCart = (product) => {
//         let currentCartValue = this.state.currentCartValue; 
//         currentCartValue[product._id]++;  
//         this.setState({ 
//             currentCartValue: currentCartValue
//         })
//     }

//     onDecAddToCart = (product) => {
//         console.log(product); 
//         let currentCartValue = this.state.currentCartValue; 
//         currentCartValue[product._id]--;  
//         this.setState({ 
//             currentCartValue: currentCartValue
//         })
//         if (this.state.currentCartValue[product._id] == 0) { 
//             this.setState({
//                 currentProduct: this.state.currentProduct.filter(item => item._id != product._id)
//             }) 
            
//         }
//     }
//     render() { 
//         return ( 
//             <React.Fragment>
//                 <NavBar 
//                     cartItem = {this.state.currentProduct}
//                     cartValue = {this.state.currentCartValue}
//                 />
//                 <main>
//                     <ProductComponent 
//                         products = {this.state.products}
//                         currentProduct = {this.state.currentProduct}
//                         isCartClicked = {this.state.isCartClicked}
//                         currentCartValue = {this.state.currentCartValue}
//                         onAddToCartClick = {this.onAddToCartClick}
//                         onIncAddToCart = {this.onIncAddToCart}
//                         onDecAddToCart = {this.onDecAddToCart}

//                         categories = {this.state.categories}
//                         selecetedCategory={this.state.selecetedCategory}
//                         onCategoryClick={this.onCategoryClick}
//                     />
//                 </main>
//             </React.Fragment>
//         );
//     }
// }
 
// export default WholePage;