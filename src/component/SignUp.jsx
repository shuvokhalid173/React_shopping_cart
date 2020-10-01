import React, { Component } from 'react';
import Joi from 'joi-browser'; 
import axios from 'axios';

class SignUp extends Component {
    state = { 
        user: {
            email: '', 
            password: '', 
            confirmpassword: ''
        }, 
        error: {
            email: '', 
            password: '', 
            confirmpassword: '', 
            server_error: ''
        }
    }

    schema = {
        email: Joi
            .string()
            .required()
            .email()
            .label('Email'), 
        password: Joi
            .string()
            .required()
            .min(4)
            .label('Password')
    }

    onInputChange = (e) => {
        const value = e.currentTarget.value; 
        const name = e.currentTarget.name;
        const user = {...this.state.user};
        const errorObj = {...this.state.error}; 

        if (name == 'confirmpassword') {
            if (!value) {
                errorObj[name] = 'Confirm password is required'; 
            } else {
                if (value == this.state.user.password) {
                    delete errorObj[name]; 
                } else {
                    errorObj[name] = 'Confirm password should be match with password'; 
                }
            }
        } else {
            let newObj = {[name]: value}; 
            let newSchema = {[name]: this.schema[name]}; 
            const error = Joi.validate(newObj, newSchema); 

            if (error.error != null) {
                errorObj[name] = error.error.details[0].message; 
            } else {
                delete errorObj[name]; 
            }
        }

        user[name] = value;

        this.setState({
            user: user, 
            error: errorObj
        })
    }

    validate = () => {
        const userwcp = {email: this.state.user.email, password: this.state.user.password}; 
        const result = Joi.validate(userwcp, this.schema, { abortEarly: false });
        // if (result.error == null) return null; 
        let error = {}; 

        if (result.error == null) {
            error['has_error'] = false; 
        } else {
            const validationResult = result.error.details;
            for (let i = 0; i < validationResult.length; i++) {
                // console.log(validationResult[i].path[0], validationResult[i].message);
                error[validationResult[i].path[0]] = validationResult[i].message + '\n';
            }
            error['has_error'] = true;
        }

        if (!this.state.user.confirmpassword) {
            error['confirmpassword'] = 'Confirm password is required'; 
            error['has_error'] = true;
        } else {
            if (this.state.user.confirmpassword !== this.state.user.password) {
                error['confirmpassword'] = 'Confirm password should be match with password';
                error['has_error'] = true;
            } else{
                delete error.confirmpassword;
                error['has_error'] = false;
            }
        }

        return error;
    }

    onFormSubmit = async (e) => {
        e.preventDefault(); 
        const error = this.validate();
        if (error.has_error == false) {
            console.log('form submitted');
            const prepareUserData = {
                email: this.state.user.email, 
                password: this.state.user.password
            } 
            
            try {
                const result = await axios.post('http://localhost:1111/user/signup', prepareUserData);
                if(typeof(result.data) == 'object') {
                    localStorage.setItem('token', result.data.token); 
                    window.location = '/product';     
                } else {
                    const error = {...this.state.error}; 
                    error['server_error'] = result.data;

                    this.setState({
                        error: error
                    }) 
                }
            } catch (error) {
                console.log(error); 
            }
        }
        else {
            this.setState({
                error: error
            });
        } 
         
    }

    render() { 
        return ( 
            <div className="container">
                <h2>Sign up form</h2>
                <form className="form" onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input value={this.state.user.email} onChange={this.onInputChange} type="text" name="email" className="form-control"/>
                        <div>
                            {this.state.error.email ? <small className="alert alert-danger">{this.state.error.email}</small>: null}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input value={this.state.user.password} onChange={this.onInputChange} type="password" name="password" className="form-control"/>
                        <div>
                            {this.state.error.password ? <small className="alert alert-danger">{this.state.error.password}</small>: null}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <input value={this.state.user.confirmpassword} onChange={this.onInputChange} type="password" name="confirmpassword" className="form-control"/>
                        <div>
                            {this.state.error.confirmpassword ? <small className="alert alert-danger">{this.state.error.confirmpassword}</small>: null}
                        </div>
                    </div>
                    <div>
                        {this.state.error.server_error ? <small className="alert alert-danger">{this.state.error.server_error}</small> : null}
                    </div>
                    <button className="btn btn-primary">Sign up</button>
                </form>
            </div>
        );
    }
}
 
export default SignUp;