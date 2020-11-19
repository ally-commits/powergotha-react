import * as actionTypes from './actionTypes'
import axios from 'axios'
import {storage} from '../../App'

export const showAlert = (msg) => dispatch => {
    dispatch({
        type: actionTypes.SHOW_ALERT,
        payload: msg
    })

    setTimeout(() => {
        // dispatch({
        //     type: actionTypes.SHOW_ALERT,
        //     payload: false
        // });
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

export const getAllImages = () => dispatch => {
    var storageRef = storage.ref();
    var listRef = storageRef.child('/product-images');

    
    listRef.listAll().then(async function(res) {
        await res.items.forEach(async function(itemRef,index) {
            await itemRef.getDownloadURL().then(url => {
                dispatch(addImage(url))
            })
        });

    }).catch(function(error) {
        
    });   
}

export const addImage = (url) => dispatch => {
    dispatch({
        type: actionTypes.ADD_IMAGE,
        payload: url
    })
}

