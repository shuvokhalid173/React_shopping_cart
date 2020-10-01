import React, { Component } from 'react';
import axios from 'axios'; 

class Orders extends Component {
    // state = { 
    //     shippingData: [], 
    //     deleverStatus: []
    // }

    // async componentDidMount() {
    //     try {
    //         const data = await axios.get('http://localhost:1111/shipping');
    //         let statusArray = [], sdata = data.data; 
    //         for (let i = 0; i < sdata.length; i++) {
    //             statusArray[sdata[i]._id] = sdata[i].status; 
    //         }

    //         this.setState({
    //             shippingData: data.data, 
    //             deleverStatus: statusArray
    //         })
    //     } catch (error) {
            
    //     }
    // }

    // onDeleverButtonClick = async (id) => {
    //     if (window.confirm("Are you sure?")) {
    //         console.log(id);
    //         console.log(this.state.deleverStatus);  
    //         const currentStatusState = {...this.state.deleverStatus}; 
    //         this.state.deleverStatus[id] = true;
    //         const newStatus = this.state.deleverStatus;  

    //         this.setState({
    //             deleverStatus: newStatus
    //         }); 

    //         try {
    //             const data = await axios.put('http://localhost:1111/shipping/' + id); 
                
    //         } catch (error) {
    //             alert('something goes wrong'); 
    //             this.state.deleverStatus[id] = false;
    //             const newStatus = this.state.deleverStatus;  

    //             this.setState({
    //                 deleverStatus: newStatus
    //             });
    //         }
    //     }
    // }

    // onShippingItemDelete = async (id) => {
    //     if (window.confirm('are you sure you want to delete? ')) {
    //       const backUpShippingData = this.state.shippingData; 
  
    //       this.setState({
    //         shippingData: this.state.shippingData.filter(item => item._id !== id)
    //       }); 
  
    //       try {
    //         await axios.delete('http://localhost:1111/shipping/' + id); 
    //       } catch (error) {
    //         alert('something goes wrong'); 
    //         this.setState({
    //           shippingData: backUpShippingData
    //         })
    //       }
    //     }
    //   }

    render() { 
        
        console.log(this.props.shippingData); 
        return ( 
            <div>
                <table className="table">
                    <thead>
                        <th>#</th>
                        <th>User</th>
                        <th>City</th>
                        <th>Street</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {this.props.shippingData.map(item => {
                            return (
                                <React.Fragment key={item._id}>
                                    <tr style={{background: "#b3ffb3"}} className="accordion-toggle collapsed" id="accordion1" data-toggle="collapse" data-parent="#accordion1" href={"#collapseOne" + item._id}>
                                        <td className="expand-button"></td>
                                        <td>{item.user}</td>
                                        <td>{item.city}</td>
                                        <td>{item.street}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.date}</td>
                                        <td style={{color: !this.props.deleverStatus[item._id] ? "red" : "green", fontWeight: "bold"}}>Delevered</td>
                                        <td><i onClick={() => this.props.onShippingItemDelete(item._id)} className="fa fa-trash-o" style={{fontSize: "24px", color: "red", cursor: 'pointer'}}></i></td>
                                    </tr>
                                    <tr className="hide-table-padding">
                                        <td></td>
                                        <td colSpan="12">
                                            <div id={"collapseOne" + item._id} className="collapse in p-12">
                                                <table className="table">
                                                    <thead>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Category</th>
                                                        <th>Quantity</th>
                                                        <th>Total price</th>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            item.items.map(product => {
                                                                return (
                                                                    <tr>
                                                                        <td><img src={'/assets/' + product.product.image} alt="" height="40px"/></td>
                                                                        <td>{product.product.name}</td>
                                                                        <td>{product.product.price}</td>
                                                                        <td>{product.product.category.name}</td>
                                                                        <td>{product.quantity}</td>
                                                                        <td>{product.quantity * product.product.price}</td>
                                                                    </tr>
                                                                ); 
                                                            })
                                                        }
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>
                                                                { 
                                                                    !this.props.deleverStatus[item._id] ? <button onClick={() => this.props.onDeleverButtonClick(item._id)} className="btn-primary">Delever</button> : null
                                                                }
                                                            </td>
                                                            <td>Grand Total</td>
                                                            <td>{item.grandTotal}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default Orders;