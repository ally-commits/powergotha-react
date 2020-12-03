import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getFarmUserList = () => dispatch => {
    dispatch({
        type: actionTypes.SET_FARM_DATA,
        payload: false
    })

    axios({
        method: "get",
        url: "/farm/getFarmUserList"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_FARM_DATA,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_FARM_DATA,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}

 
export const getFarmDetails = (userId) => dispatch => {
    dispatch({
        type: actionTypes.SET_FARM_DETAILS,
        payload: false
    })

    axios({
        method: "get",
        url: "/farm/getFarmDetails?userId=" + userId
    }).then(res => {
        dispatch({
            type: actionTypes.SET_FARM_DETAILS,
            payload: res.data.farms
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_FARM_DETAILS,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}

export const onFarmDelete = (farmId,userId) => dispatch => {
    axios({
        method: "delete",
        url: "/farm/deleteFarm",
        data: {
            farmId,
            userId
        }
    }).then(res => {
        dispatch(getFarmUserList())
        dispatch(getFarmDetails(userId))
        dispatch({
            type: "SHOW_ALERT",
            payload: "Farm Deleted Successfully"
        })
    }).catch(err => {  
        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}