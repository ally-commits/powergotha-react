import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllProducts = () => dispatch => {
    dispatch({
        type: actionTypes.SET_PRODUCTS,
        payload: false
    })

    axios({
        method: "get",
        url: "/dashboard/product/getAllProduct"
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

export const onProductDelete = (productId) => dispatch => {
    axios({
        method: "delete",
        url: "/dashboard/product/deleteProduct",
        data: {
            productId
        }
    }).then(res => {
        dispatch(getAllProducts())
        dispatch({
            type: "SHOW_ALERT",
            payload: "Product Deleted Successfully"
        })
    }).catch(err => {  
        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}