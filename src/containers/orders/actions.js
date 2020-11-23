import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllOrders = () => dispatch => {
    dispatch({
        type: actionTypes.SET_ORDERS,
        payload: false
    })

    axios({
        method: "get",
        url: "/dashboard/orders/getAllOrders"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_ORDERS,
            payload: res.data.orders
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_ORDERS,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
} 