import React, { Component } from 'react';
import axios from 'axios'; 
import Joi from 'joi-browser'; 

axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token'); 

class ProductForm extends Component {
    state = { 
        product: {
            id: "",
            name: "", 
            price: "", 
            categoryId: "", 
            image: "", 
            file: null
        }, 
        categories: [], 
        errors: {}
    }

    schema = {
        name: Joi
            .string()
            .required()
            .label("Product name"),
        price: Joi
            .number()
            .required()
            .min(1)
            .label("Product price"), 
        categoryId: Joi
            .string()
            .required().invalid('0')
            .label("Product category")
    }

    async componentDidMount() {
        const productId = this.props.match.params.id; 
        const allCategory = await axios.get('http://localhost:1111/category');

        if (productId == 'new') {
            this.setState({
                categories: allCategory.data
            }); 
            return ;  
        }

        const selectedProduct = (await axios.get('http://localhost:1111/product/' + productId));  
        
        if (selectedProduct.data == 'no') {
            this.props.history.replace('/not-found');
            return 1; 
        }

        this.setState({
            product: this.getViewModelOfMovie(selectedProduct.data), 
            categories: allCategory.data
        }); 
    }

    getViewModelOfMovie = (product) => {
        return {
            id: product._id,  
            categoryId: product.category._id, 
            price: product.price, 
            name: product.name, 
            image: '/assets/' + product.image
        }
    }

    validate = () => {
        const newProduct = {...this.state.product}; 
        delete newProduct['image']; 
        delete newProduct['file']; 
        
        const errorResult = Joi.validate(newProduct, this.schema, {abortEarly: false}); 
        const errorDetails = errorResult.error.details; 
        
        let errors = {};
        
        if (errorDetails.length > 1) { 
            for (let i = 0; i < errorDetails.length; i++) {
                errors[errorDetails[i].path[0]] = errorDetails[i].message; 
            } 
        } 
        
        /// handle image for update and create 
        if(this.props.match.params.id == 'new') {
            if (!this.state.product.file) {
                errors['image'] = 'image is required'; 
            }
        } else {
            if (!this.state.product.file || this.state.product.file == null) {
                if (!this.state.product.image){
                    errors['image'] = 'image is required';
                } 
            }
        }

        return errors;
    }

    onSubmitFrom = e => {
        e.preventDefault();
        const errors = this.validate();

        this.setState({
            errors: errors
        }); 

        if (Object.keys(errors).length == 0) {
            console.log('form submitted', this.state.product);
            const formData = new FormData();
            formData.append('file',this.state.product.file);
            formData.append('id', this.state.product.id); 
            formData.append('name',this.state.product.name);
            formData.append('price',this.state.product.price);
            formData.append('categoryId',this.state.product.categoryId);
    
            axios.post("http://localhost:1111/product", formData, {})
                .then((response) => {
                    this.props.history.push('/product');
                }).catch((error) => {
            });
        }
    }

    onChange = e => {
        const product = {...this.state.product}; 
        const name = e.currentTarget.name;

        if (name == 'image') {
            const errObj = {...this.state.errors};
            console.log('change happen'); 
            // product[e.currentTarget.name] = e.currentTarget.files[0].name;
            // console.log(e.currentTarget.files[0].name);
            product.file = e.currentTarget.files[0];
            console.log(product.file); 
            let reader = new FileReader(); 
            
            if (product.file) {
                let url = reader.readAsDataURL(product.file); 
            
                reader.onloadend = (e) => {
                    product.image = [reader.result]; 
                    errObj['image'] = null;
                    this.setState ({
                        product: product, 
                        errors: errObj
                    })
                }
            } else {
                console.log('else condition is running'); 
                product.image = '';  
                errObj['image'] = "file is required"; 
                this.setState({
                    product: product, 
                    errors: errObj
                }) 
            }
            
        }

        else {
            const value = e.currentTarget.value; 

            const newObj = {[name]: value}; 
            const newSchema = {[name]: this.schema[name]}; 

            const error = Joi.validate(newObj, newSchema);
            const errorObj = {...this.state.errors}; 

            if (error.error != null) {
                errorObj[name] = error.error.details[0].message; 
            } else {
                delete errorObj[name]; 
            }

            product[name] = value;

            this.setState({
                product: product, 
                errors: errorObj
            })
        }
    }

    render() {  
        const { product } = this.state;

        return (
            <div>
                <form className="form" onSubmit={this.onSubmitFrom}>
                    <input type="text" hidden value={product.id}/>

                    <div className="form-group">
                        <label htmlFor="productName">Product name</label>
                        <input onChange={this.onChange} name="name" value={product.name} type="text" className="form-control"/>
                        {this.state.errors.name && <small className="alert alert-danger">{this.state.errors['name']}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="productCategory">Product category</label>
                        <select onChange={this.onChange} name="categoryId" value={product.categoryId} className="form-control" id="">
                            <option value="0">Select category</option>
                            {this.state.categories.map(category => {
                                return <option key={category._id} value={category._id}>{category.name}</option>
                            })}
                        </select>
                        {this.state.errors.categoryId && <small className="alert alert-danger">{this.state.errors['categoryId']}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="productPrice">Product price</label>
                        <input onChange={this.onChange} name="price" value={product.price} type="number" className="form-control"/>
                        {this.state.errors.price && <small className="alert alert-danger">{this.state.errors['price']}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="productImage">Product Image</label>
                        <img src={product.image} height='40px' width='40px'/>
                        <input type="file" onChange={this.onChange} name="image" accept="image/x-png,image/gif,image/jpeg" className="form-control"/>
                        {this.state.errors.image && <small className="alert alert-danger">{this.state.errors['image']}</small>}
                    </div>

                    <button className="btn btn-primary">{
                        this.props.match.params.id == 'new' ? "Create" : "Update"
                    }</button>
                </form>
            </div>
        );
    }
}
 
export default ProductForm;