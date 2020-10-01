import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios'; 

class Login extends Component {
    state = { 
        email: "", 
        password: "",
        error: ""    
    }

    onFormSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const result = await axios.post('http://localhost:1111/user/login', {email: this.state.email, password: this.state.password});
            if(typeof(result.data) == 'object') {
                localStorage.setItem('token', result.data.token); 
                window.location = '/product';     
            } else {
                this.setState({
                    error: result.data
                }) 
            }
            //localStorage.setItem('token', result.data.token); 
            // this.props.history.push('/product');  
        } catch (error) {
            console.log(error); 
        } 
    }

    onInputChange = e => {
        const name = e.currentTarget.name; 
        const value = e.currentTarget.value; 

        this.setState({
            [name]: value
        })
    }

    render() { 
        return (
            <div className="container">
                <h2>Log in form</h2>
                <form className="form" onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={this.onInputChange} value={this.state.email} type="text" name="email" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={this.onInputChange} value={this.state.password} type="password" name="password" className="form-control"/>
                    </div>
                    <div className="form-group">
                        {this.state.error ? <small className="alert alert-danger">{this.state.error}</small> : ""}
                    </div>
                    <button className="btn btn-primary">Log in</button>
                </form>
                <div>
                    <span>Don't hava an account <Link to="/signup">signup</Link> </span>
                </div>
            </div>
        );
    }
}
 
export default Login;