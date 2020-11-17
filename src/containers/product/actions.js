import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllProducts = () => dispatch => {
    dispatch({
        type: actionTypes.SET_PRODUCTS,
        payload: false
    })

    axios({
        method: "get",
        url: "/admin/product/getAllProduct"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_PRODUCTS,
            payload: res.data.product
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_PRODUCTS,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}