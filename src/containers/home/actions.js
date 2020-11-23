import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllData = () => dispatch => {
    dispatch({
        type: actionTypes.SET_DATA,
        payload: false
    })

    axios({
        method: "get",
        url: "/dashboard/analytics/getDetails"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_DATA,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_DATA,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}
 