import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllWarehouse = () => dispatch => {
    dispatch({
        type: actionTypes.SET_WAREHOUSE,
        payload: false
    })

    axios({
        method: "get",
        url: "/admin/warehouse/getAllWarehouse"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_WAREHOUSE,
            payload: res.data.warehouse
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_WAREHOUSE,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}

export const onWarehouseDelete = (warehouseId) => dispatch => {
    axios({
        method: "delete",
        url: "/admin/warehouse/deleteWarehouse",
        data: {
            warehouseId
        }
    }).then(res => {
        dispatch(getAllWarehouse())
        dispatch({
            type: "SHOW_ALERT",
            payload: "Warehouse Deleted Successfully"
        })
    }).catch(err => {  
        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}