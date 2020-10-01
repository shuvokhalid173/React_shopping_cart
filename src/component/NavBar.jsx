import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

class NavBar extends Component {
    state = {
        socketData: null
    }

    

    render() { 
        console.log('hello', this.state.socketData);  
        return ( 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink 
                                className="nav-link notification" 
                                to={{
                                    pathname: "/cart", 
                                    state: {
                                       totalItemsInCart: this.props.totalItemsInCart, 
                                       totalItemsValueInCart: this.props.totalItemsValueInCart 
                                    }
                                }}
                            >
                                <i className="fa fa-shopping-cart" style={{fontSize: '30px'}}></i> 
                                {this.props.totalItemsInCart.length > 0 ? <span className="badge">{this.props.totalItemsInCart.length}</span> : null}
                            </NavLink>
                        </li>
                        <li style={{paddingTop: '2%'}} className="nav-item">
                            <NavLink className="nav-link" to="/product">Product</NavLink>
                        </li>
                        {
                            this.props.currentUser.userType == 'admin' ? 
                                <li style={{paddingTop: '2%'}} className="nav-item">
                                    <NavLink className="nav-link" to="/product-action">Product action</NavLink>
                                </li> 
                            : 
                                null
                        }
                        {
                            this.props.currentUser.userType == 'admin' ? 
                                <li style={{paddingTop: '2%'}} className="nav-item">
                                    <NavLink className="nav-link notification" to="/orders">Orders<span className="badge">{this.props.notification.length}</span></NavLink>
                                </li> 
                            : 
                                null
                        }
                        {this.props.currentUser ? 
                            <React.Fragment>
                                <li style={{paddingTop: '2%'}} className="nav-item">
                                    <span className="nav-link">{this.props.currentUser.email}</span>
                                </li>
                                <li style={{paddingTop: '2%', cursor: 'pointer'}} className="nav-item">
                                    <span className="nav-link" onClick={() => this.props.logOut()}>Logout</span>
                                </li>
                            </React.Fragment>
                         :
                            <React.Fragment>
                                <li style={{paddingTop: '2%'}} className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li style={{paddingTop: '2%'}} className="nav-item">
                                    <NavLink className="nav-link" to="/signup">Signup</NavLink>
                                </li>
                            </React.Fragment>
                        }
                    </ul>
                </div>
            </nav> 
        );
    }
}
 
export default NavBar;