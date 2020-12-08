import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllCategory = () => dispatch => {
    dispatch({
        type: actionTypes.SET_CATEGORY,
        payload: false
    })

    axios({
        method: "get",
        url: "/animal-category/getAllCategory"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_CATEGORY,
            payload: res.data.category
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_CATEGORY,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}

export const onCategoryDelete = (categoryId) => dispatch => {
    axios({
        method: "delete",
        url: "/animal-category/deleteCategory",
        data: {
            categoryId
        }
    }).then(res => {
        dispatch(getAllCategory())
        dispatch({
            type: "SHOW_ALERT",
            payload: "Category Deleted Successfully"
        })
    }).catch(err => {  
        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}