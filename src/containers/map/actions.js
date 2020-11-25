import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllManagers = () => dispatch => {
    dispatch({
        type: actionTypes.SET_MANAGERS,
        payload: false
    })

    axios({
        method: "get",
        url: "/admin/manager/getAllManagers"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_MANAGERS,
            payload: res.data.managers
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_MANAGERS,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}

export const onManagerDelete = (userId) => dispatch => {
    axios({
        method: "delete",
        url: "/admin/manager/deleteManager",
        data: {
            userId
        }
    }).then(res => {
        dispatch(getAllManagers())
        dispatch({
            type: "SHOW_ALERT",
            payload: "Manager Deleted Successfully"
        })
    }).catch(err => {  
        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}