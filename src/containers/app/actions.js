import * as actionTypes from './actionTypes'

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