import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllCategory = () => dispatch => {
    dispatch({
        type: actionTypes.SET_CATEGORY,
        payload: false
    })

    axios({
        method: "get",
        url: "/admin/category/getAllCategory"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_CATEGORY,
            payload: res.data.category
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_CATEGORY,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}