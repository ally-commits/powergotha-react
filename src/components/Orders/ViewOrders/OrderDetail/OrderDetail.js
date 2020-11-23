import React from 'react'
import styles from './OrderDetail.module.css' 

import Dialog from '@material-ui/core/Dialog'  
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button' 

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import {connect} from 'react-redux';
import axios from 'axios'
import {showAlert} from '../../../../containers/app/actions'
import {getAllOrders} from '../../../../containers/orders/actions'
 
const OrderDetail = (props) => {
    const [orderStatus,setOrderStatus] = React.useState(props.activeOrder.orderStatus)
    const [loading,setLoading] = React.useState(false);
  
    const order = props.activeOrder ? props.activeOrder : {};
    let totalAmount = 0;
    order.orderItems.map(val => {
        totalAmount += val.quantity * val.productId.productPrice;
    });

    const onSubmit = () => {
        setLoading(true);
        axios({
            method: "put",
            url: "/dashboard/orders/updateOrderStatus",
            data: {
                orderId: order._id,
                orderStatus: orderStatus
            }
        }).then(res => {
            setLoading(false);
            props.showAlert("Order Status Succesfully"); 
            props.getAllOrders();
            props.onClose();
        }).catch(err => {
            setLoading(false);
            if(err && err.response && err.response.data && err.response.data.error) {
                props.showAlert(err.response.data.error)
            } else {
                props.showAlert("Something went wrong ! Try Again")
            }
        })
    }
    return (
        <Dialog open={props.activeOrder} onClose={() => props.onClose()} maxWidth="md">
            <div className={styles.container}>
                <CloseRoundedIcon  onClick={() => props.onClose()} className={styles.close} />

                <div className={styles.row}>
                    <div className={styles.col}>
                        <h1>User Details:</h1>
                        <p><span>Name:</span> {order.userId.name}</p>
                        <p><span>Phone Number:</span> {order.userId.phoneNumber}</p>    
                        <p><span>DOB:</span> {order.userId.dob.substring(0,10)}</p>    
                    </div>

                    <div className={styles.col}>
                        <h1>Order To Adress:</h1>
                        <p><span>Address - 1:</span> {order.addressId.address1}</p>
                        <p><span>Address - 2:</span> {order.addressId.address2}</p>    
                        <p><span>Phone Number:</span> {order.addressId.phoneNumber}</p>   
                        <p><span>Pincode:</span> {order.addressId.pincode}</p>    
                    </div>
                </div>

                <h1>Ordered Items:</h1>        

                <table className={styles.table}>
                    <tr>
                        <th>Sl No</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Product Quantity</th>
                        <th>Total</th>
                    </tr> 
                    {order.orderItems.map((val,index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{val.productId.productName}</td>
                                <td>{val.productId.productPrice}</td>
                                <td>{val.quantity}</td>
                                <td>{val.productId.productPrice * val.quantity}</td>
                            </tr>   
                        )
                    })}
                    <tr>
                        <td colSpan={3}>&nbsp;</td>
                        <td colSpan={2}>Total Amount: {totalAmount}</td>
                    </tr>
                </table>    

                <h1>Update Order Status:</h1>    

                <div className={styles.rowStatus}>
                    <Select 
                        className={styles.select}
                        lable="Order Status"
                        value={orderStatus}
                        disabled={order.orderStatus == "CANCELLED"}
                        onChange={e => setOrderStatus(e.target.value)}
                    > 
                        <MenuItem className={styles.item} value={"ORDERED"}>ORDERED</MenuItem>
                        <MenuItem className={styles.item} value={"SHIPPED"}>SHIPPED</MenuItem>
                        <MenuItem className={styles.item} value={"OUT_FOR_DELIVERY"}>OUT_FOR_DELIVERY</MenuItem>
                        <MenuItem className={styles.item} value={"DELIVERED"}>DELIVERED</MenuItem>
                        <MenuItem className={styles.item} value={"CANCELLED"}>CANCELLED</MenuItem>
                    </Select>

                    {loading
                        ?
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>Loading ...</Button>
                        :
                    <Button color="primary" variant="contained" disabled={order.orderStatus == "CANCELLED"} startIcon={<UpdateRoundedIcon />} onClick={onSubmit}>Update Status</Button>}
                </div>
            </div>
        </Dialog>
    )
} 
export default connect(null,{showAlert,getAllOrders})(OrderDetail);