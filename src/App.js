import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProductComponent from './Product/productComponent';
import Navbar from './component/NavBar';
import ProductAction from './component/ProductAction';  
import ProductForm from './Product/ProductForm';
import axios from 'axios';
import Cart from './Product/cart'; 
import Login from './component/Login';
import SignUp from './component/SignUp';
import jwtDecode from 'jwt-decode'; 
import ShippingForm from './component/ShippingForm';
import Orders from './component/Orders';
import socketIOClient from 'socket.io-client';

class App extends Component {
    state = { 
      categories: [], 
      selecetedCategory: '0',
      products: [], 
      allProduct: [],
      currentProduct: [], 
      isCartClicked: false,
      currentCartValue: [], 
      currentUser: "", 

      shippingData: [], 
      deleverStatus: [], 

      ordersNotifications: [], 
      socketData: {}
    }

    async componentDidMount() {
      const socket = socketIOClient('http://127.0.0.1:1111'); 
      socket.on('broadcast', function (data) {
        const shippingData = data.allData;
        let statusArray = [], sdata = shippingData; 
        let ordersNotifications = []; 

        for (let i = 0; i < sdata.length; i++) {
            statusArray[sdata[i]._id] = sdata[i].status;
            if (sdata[i].status == false) {
              ordersNotifications.push(sdata); 
            } 
        }

        this.setState({
            socketData: data.data, 
            shippingData: data.allData, 
            deleverStatus: statusArray,
            ordersNotifications: ordersNotifications
        });
      }.bind(this)); 
      const categories = await axios.get('http://localhost:1111/category');
      const products = await axios.get('http://localhost:1111/product'); 
      let currentCartValue = [];

      const token = localStorage.getItem('token'); 
      let currentUser = ""; 
      if (token) 
      currentUser = jwtDecode(token); 
      this.setState({
          categories: categories.data, 
          products: products.data, 
          allProduct: products.data, 
          currentUser: currentUser, 

          // shippingData: shippingData.data, 
          // deleverStatus: statusArray,

          // ordersNotifications: ordersNotifications
          //currentCartValue: currentCartValue
      }) 
    }

    onCategoryClick = (id) => {
      if (id != '0') {
          this.setState({
              selecetedCategory: id , 
              products: this.state.allProduct.filter(i => i.category._id == id)
          }); 
      } else {
          this.setState({
              selecetedCategory: id , 
              products: this.state.allProduct
          }); 
      }
    }

    onAddToCartClick = (product) => {
      let currentProductArray = this.state.currentProduct; 
      currentProductArray.push(product);
      let currentCartValue = this.state.currentCartValue; 
      currentCartValue[product._id] = 1;  
      this.setState({
          currentProduct: currentProductArray, 
          isCartClicked: true, 
          currentCartValue: currentCartValue
      })
      console.log(this.state.currentProduct); 
    }

    onIncAddToCart = (product) => {
      let currentCartValue = this.state.currentCartValue; 
      currentCartValue[product._id]++;  
      this.setState({ 
          currentCartValue: currentCartValue
      })
    }

    onDecAddToCart = (product) => {
      console.log(product); 
      let currentCartValue = this.state.currentCartValue; 
      currentCartValue[product._id]--;  
      this.setState({ 
          currentCartValue: currentCartValue
      })
      if (this.state.currentCartValue[product._id] == 0) { 
          this.setState({
              currentProduct: this.state.currentProduct.filter(item => item._id != product._id)
          }) 
          
      }
    }

    logOut = () => {
      localStorage.removeItem('token'); 
      window.location.href = "/product"; 
    }

    getCurrentUser = () => {
      const token = localStorage.getItem('token'); 
      let currentUser = ""; 
      if (token) 
        currentUser = jwtDecode(token); 
      return currentUser; 
    }

    onDeleverButtonClick = async (id) => {
      if (window.confirm("Are you sure?")) { 
          const currentStatusState = {...this.state.deleverStatus}; 
          const backupSocketData = [...this.state.socketData]; 

          this.state.deleverStatus[id] = true;
          const newStatus = this.state.deleverStatus;  

          this.setState({
              deleverStatus: newStatus, 
              socketData: this.state.socketData.filter(i => i._id !== id)
          }); 

          try {
              const data = await axios.put('http://localhost:1111/shipping/' + id); 
              
          } catch (error) {
              alert('something goes wrong'); 
              this.state.deleverStatus[id] = false;
              const newStatus = this.state.deleverStatus;  
              console.log('backupsocketdata', backupSocketData);
              this.setState({
                  deleverStatus: newStatus,
                  socketData: backupSocketData
              });
          }
      }
    }

    onShippingItemDelete = async (id) => {
      if (window.confirm('are you sure you want to delete? ')) {
        const backUpShippingData = this.state.shippingData; 
        const backupSocketData = [...this.state.socketData];

        this.setState({
          shippingData: this.state.shippingData.filter(item => item._id !== id),
          socketData: this.state.socketData.filter(i => i._id !== id)
        }); 

        try {
          await axios.delete('http://localhost:1111/shipping/' + id); 
        } catch (error) {
          alert('something goes wrong'); 
          this.setState({
            shippingData: backUpShippingData,
            socketData: backupSocketData
          })
        }
      }
    }

    render() { 
      return ( 
        <React.Fragment>
          {/* <h1>{this.state.socketData.length} -- {this.state.ordersNotifications.length}</h1> */}
          <Navbar 
            totalItemsInCart={this.state.currentProduct}
            totalItemsValueInCart={this.state.currentCartValue}
            currentUser={this.getCurrentUser()}
            logOut={this.logOut}
            ordersNotifications={this.state.ordersNotifications}
            notification={this.state.socketData}
          />

          <main className="container">
            <Switch>
              <Route 
                exact
                path="/product" 
                render={
                  props => <ProductComponent 
                  products = {this.state.products}
                  currentProduct = {this.state.currentProduct}
                  isCartClicked = {this.state.isCartClicked}
                  currentCartValue = {this.state.currentCartValue}
                  onAddToCartClick = {this.onAddToCartClick}
                  onIncAddToCart = {this.onIncAddToCart}
                  onDecAddToCart = {this.onDecAddToCart}
                  currentUser = {this.state.currentUser}

                  categories={this.state.categories}
                  selecetedCategory={this.state.selecetedCategory}
                  onCategoryClick={this.onCategoryClick}
              />}/>

              <Route path="/product-action" exact render={
                props => {
                  const currentUser = this.getCurrentUser(); 
                  if (!currentUser) {
                    return <Redirect to="/login" />
                  } else {
                    if (currentUser.userType != 'admin') {
                      alert ('You are not admin'); 
                      return <Redirect to="/product" />
                    } else{
                      return <ProductAction {...props} />
                    }
                  }
                }
              }/>

              <Route path="/login" exact render={
                props => {
                  const currentUser = this.getCurrentUser();  
                  if (!currentUser) {
                    return <Login {...props}/>
                  } else {
                    alert('You are already logged in'); 
                    window.location = '/product'; 
                  }
                }
              }/>

              <Route path="/signup" exact component={SignUp}/>

              <Route path="/product/:id" exact render={
                props => {
                  const currentUser = this.getCurrentUser(); 
                  if (!currentUser) {
                    return <Redirect to="/login" />
                  } else {
                    if (currentUser.userType != 'admin') {
                      alert ('You are not admin'); 
                      return <Redirect to="/product" />
                    } else{
                      return <ProductForm {...props} />
                    }
                  }
                }
              }/>
              
              <Route path="/cart" exact render={
                props => {
                  const currentUser = this.getCurrentUser(); 
                  if (!currentUser) {
                    return <Redirect to="/login" />
                  } else { 
                    return <Cart {...props} />
                  }
                }
              }/>

              <Route path='/' exact render={
                props => {
                  return <Redirect to='/product' />
                }
              }/>

              <Route path='/shipping-form' exact render={
                props => {
                  const currentUser = this.getCurrentUser();  
                  if (!currentUser) {
                    return <Redirect to="/login"/> 
                  } else {
                    return <ShippingForm user={currentUser} {...props}/>
                  }
                }
              }/>

              <Route path="/orders" exact render={
                props => {
                  const currentUser = this.getCurrentUser(); 
                  if (!currentUser) {
                    return <Redirect to="/login" />
                  } else {
                    if (currentUser.userType != 'admin') {
                      alert ('You are not admin'); 
                      return <Redirect to="/product" />
                    } else{
                      return <Orders 
                        {...props} 
                        shippingData={this.state.shippingData}
                        deleverStatus={this.state.deleverStatus}
                        onDeleverButtonClick={this.onDeleverButtonClick}
                        onShippingItemDelete={this.onShippingItemDelete}
                      />
                    }
                  }
                }
              }/>
            </Switch>
          </main>
        </React.Fragment>
      );
    }
}
 
export default App