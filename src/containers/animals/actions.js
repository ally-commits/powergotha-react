import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAnimalUserList = () => dispatch => {
    dispatch({
        type: actionTypes.SET_ANIMAL_DATA,
        payload: false
    })

    axios({
        method: "get",
        url: "/animal/getAnimalUserList"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_ANIMAL_DATA,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_ANIMAL_DATA,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}

 
export const getAnimalDetails = (userId) => dispatch => {
    dispatch({
        type: actionTypes.SET_ANIMAL_DETAILS,
        payload: false
    })

    axios({
        method: "get",
        url: "/animal/getAnimalUserList?userId=" + userId
    }).then(res => {
        dispatch({
            type: actionTypes.SET_ANIMAL_DETAILS,
            payload: res.data.animals
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_ANIMAL_DETAILS,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}

export const onAnimalDelete = (animalId,userId) => dispatch => {
    axios({
        method: "delete",
        url: "/animal/deleteAnimal",
        data: {
            animalId,
            userId
        }
    }).then(res => {
        dispatch(getAnimalUserList())
        dispatch(getAnimalDetails(userId))
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