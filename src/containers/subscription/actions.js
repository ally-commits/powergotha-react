import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllSubscriptions = () => dispatch => {
    dispatch({
        type: actionTypes.SET_SUBSCRIPTION,
        payload: false
    })

    axios({
        method: "get",
        url: "/subscription/getAllSubscription"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_SUBSCRIPTION,
            payload: res.data.subscriptions
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_SUBSCRIPTION,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}
