import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllUsers = () => dispatch => {
    dispatch({
        type: actionTypes.SET_USER_DATA,
        payload: false
    })
 
    axios({
        method: "get",
        url: "/end-user/getAllUsers"
    }).then(res => { 
        dispatch({
            type: actionTypes.SET_USER_DATA,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_USER_DATA,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}

export const onUserDelete = (userId) => dispatch => {
    axios({
        method: "delete",
        url: "/end-user/deleteUser",
        data: {
            userId
        }
    }).then(res => {
        dispatch(getAllUsers())
        dispatch({
            type: "SHOW_ALERT",
            payload: "User Deleted Successfully"
        })
    }).catch(err => {  
        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}