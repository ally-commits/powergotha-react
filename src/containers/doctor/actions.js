import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllDoctors = () => dispatch => {
    dispatch({
        type: actionTypes.SET_DOCTORS,
        payload: false
    })

    axios({
        method: "get",
        url: "/doctor/getAllDoctors"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_DOCTORS,
            payload: res.data.doctors
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_DOCTORS,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}

export const onDoctorDelete = (doctorId) => dispatch => {
    axios({
        method: "delete",
        url: "/doctor/deleteDoctor",
        data: {
            doctorId
        }
    }).then(res => {
        dispatch(getAllDoctors())
        dispatch({
            type: "SHOW_ALERT",
            payload: "Doctor Deleted Successfully"
        })
    }).catch(err => {  
        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}