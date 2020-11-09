import * as actionTypes from './actionTypes'
import axios from 'axios'

export const showAlert = (msg) => dispatch => {
    dispatch({
        type: actionTypes.SHOW_ALERT,
        payload: msg
    })

    setTimeout(() => {
        dispatch({
            type: actionTypes.SHOW_ALERT,
            payload: false
        })
    },5000)
}

export const getUserList = () => dispatch => {
    axios({
        method: "post",
        url: "/getUsersList"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_USERS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(showAlert("Error fetching data"))
    })
} 

export const setAuth = (data) => dispatch => {
    dispatch({
        type: actionTypes.SET_AUTH,
        payload: data
    })
}