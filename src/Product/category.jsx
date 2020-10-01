import React, { Component } from 'react';

class Category extends Component {
    render() {
        return ( 
            <ul className="list-group">
                <li 
                    className={this.props.selecetedCategory == '0' ? "list-group-item active" : "list-group-item"} 
                    onClick={()=>this.props.onCategoryClick('0')}
                >
                    All
                </li>
                {this.props.categories.map((item) => {
                    let class_name = item._id == this.props.selecetedCategory ? "list-group-item active": "list-group-item"; 
                    return <li 
                                key={item._id} 
                                className={class_name} 
                                onClick={()=>this.props.onCategoryClick(item._id)}
                            >
                                {item.name}
                            </li>
                })}
            </ul>
        );
    }
}
 
export default Category;