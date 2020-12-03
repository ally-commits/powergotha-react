import React from 'react'
import styles from './ViewBlogPost.module.css'
import renderHTML from 'react-render-html';
import {useLocation} from 'react-router-dom'
import AppLoader from '../../utils/AppLoader/AppLoader';

import {connect} from 'react-redux'
import {getAllBlogPost} from '../../../containers/blogpost/actions'

const ViewBlogPost = (props) => {
    let { search } = useLocation();
    const query = new URLSearchParams(search);

    const [data,setData] = React.useState(false);

    React.useEffect(() => {
        if(props.blogs) {
            if(query.get("blogId")) {
                props.blogs.forEach(blog => {
                    if(blog._id == query.get("blogId")) { 
                        setData(blog)
                    }
                })
            } else {
                props.showAlert("Data Not Found")
                props.history.push("/admin/end-users/VIEW-END-USERS")
            }
        } else {
            props.getAllBlogPost();
        }
    },[props.blogs])

    let isLoading = !data;
    let showData = !isLoading;
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {isLoading && <AppLoader />}

                {showData &&
                    <div className={styles.blogContent}>
                        <h1>{data.title}</h1>
                        <img src={data.image} alt=""/>

                        {/* {renderHTML(data.content)} */}
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    blogs: state.blog.blogs
})

export default connect(mapStateToProps,{getAllBlogPost})(ViewBlogPost);