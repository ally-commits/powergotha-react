import * as actionTypes from './actionTypes'
import axios from 'axios'
 
export const getAllBlogPost = () => dispatch => {
    dispatch({
        type: actionTypes.SET_BLOGS,
        payload: false
    })

    axios({
        method: "get",
        url: "/blog-post/getAllBlogPost"
    }).then(res => {
        dispatch({
            type: actionTypes.SET_BLOGS,
            payload: res.data.blogPosts
        })
    }).catch(err => {
        dispatch({
            type: actionTypes.SET_BLOGS,
            payload: []
        })

        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}

export const onBlogDelete = (blogId) => dispatch => {
    axios({
        method: "delete",
        url: "/blog-post/deleteBlogPost",
        data: {
            blogId
        }
    }).then(res => {
        dispatch(getAllBlogPost())
        dispatch({
            type: "SHOW_ALERT",
            payload: "Blog Deleted Successfully"
        })
    }).catch(err => {  
        dispatch({
            type: "SHOW_ALERT",
            payload: "Something went Wrong! Try Again"
        })
    })
}