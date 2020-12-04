import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllFeedback = () => dispatch => {
    dispatch({
        type: actionTypes.SET_FEEDBACK_DATA,
        payload: false
    })

    axios({
        method: "get",
        url: "/feedback/getAllFeedback"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_FEEDBACK_DATA,
            payload: res.data.feedback
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_FEEDBACK_DATA,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}

  