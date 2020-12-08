import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllUsers = () => dispatch => {
    dispatch({
        type: actionTypes.SET_USERS,
        payload: false
    })

    axios({
        method: "get",
        url: "/cse/getAllUsers"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_USERS,
            payload: res.data.users
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_USERS,
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
        url: "/cse/deleteUser",
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