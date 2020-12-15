import React from 'react'
import styles from './EditBlog.module.css'

import 'react-quill/dist/quill.snow.css';

import MediaHandler from '../../Media/MediaHandler';

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField' 
import Button from '@material-ui/core/Button' 
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip' 

import IconButton from '@material-ui/core/IconButton';

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';

import {connect} from 'react-redux'
import {getAllBlogPost} from '../../../containers/blogpost/actions' 
import {showAlert} from '../../../containers/app/actions'
import axios from 'axios'
import {withRouter,useLocation} from 'react-router-dom'

import ReactQuill from 'react-quill';
import { defaultBlogImage } from '../../../config/config';
import LANG from '../../../translator';

const EditBlog = (props) => { 
    let { search } = useLocation();
    const query = new URLSearchParams(search);

    const [formData,setFormData] = React.useState({
        title: "",
        postContent: "",
        image: defaultBlogImage,
        blogId: ""
    });

    const [error,setError] = React.useState({
        title: false,
        postContent: false 
    });

    const [loading,setLoading] = React.useState(false);
    const [modal,setModal] = React.useState(false);

    React.useEffect(() => {
        if(props.blogs) {
            if(query.get("blogId")) {
                props.blogs.forEach(blog => {
                    if(blog._id == query.get("blogId")) { 
                        setFormData({...formData,title: blog.title,image: blog.image,blogId: blog._id});
                        setTimeout(() => {setFormData({...formData,postContent: blog.postContent})},500)
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

    const validate = () => {
        const err = {title: false,postContent: false };
        let validData = true;
        setError({...err});
        Object.keys(err).forEach(key => {
            if(formData[key] == "") {
                err[key] = `Field cannot be empty`
                validData = false;
            } 
        }) 
        setError({...err});
        return validData;
    }

    const onSubmit = () => {
        if(validate()) {
            setLoading(true);

            axios({
                method: "put",
                url: "/blog-post/editBlogPost",
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.showAlert("Blog Updated Succesfully");
                props.getAllBlogPost()
                props.history.push("/user/blog-post/VIEW-BLOG")
            }).catch(err => {
                setLoading(false);
                if(err && err.response && err.response.data && err.response.data.error) {
                    props.showAlert(err.response.data.error)
                } else {
                    console.log(err);   
                    props.showAlert("Something went wrong ! Try Again")
                }
            })
        }
    }  

    console.log(formData)
    return (
        <div className={styles.container}>
            <Paper variant="outlined" className={styles.paper}>
                <h1>{LANG.EDIT + " " + LANG.BLOG_POST}</h1>

                <div className={styles.row}>
                    <TextField 
                        label={LANG.TITLE}
                        className={styles.catName}
                        value={formData.title}
                        onChange={e => setFormData({...formData,title: e.target.value})}
                        error={error.title}
                        helperText={error.title}
                    /> 

                </div>

                <div className={styles.rowContent}>
                    <div className={styles.content}>
                        <ReactQuill 
                            value={formData.postContent}
                            className={styles.textEditor}
                            onChange={e => setFormData({...formData,postContent: e})} 
                        />
                        {error.content && <span className={styles.textRed}>{error.content}</span>}
                    </div>


                    <div className={styles.image}>
                        <MediaHandler 
                            open={modal}
                            onClose={() => setModal(false)}
                            onSelectImage={url => {
                                setFormData({...formData,image: url})
                                setModal(false)
                            }}
                        />
                        <p>{LANG.PICTURE}</p>
                        
                        <img src={formData.image} alt="" className={styles.img} onClick={() => setModal(true)}/>
                        
                        <Tooltip title={LANG.EDIT + " " + LANG.PICTURE}>
                            <IconButton className={styles.editButton} onClick={() => setModal(true)}>
                                <EditRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <div className={styles.row}>
                    {loading
                        ?
                    <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>{LANG.LOADING}</Button>
                        :
                    <Button color="primary" variant="contained" startIcon={<UpdateRoundedIcon />} onClick={onSubmit}>{LANG.EDIT + " " + LANG.BLOG_POST}</Button>}
                </div>
            </Paper>
        </div>
    )
}

const mapStateToProps = state => ({
    blogs: state.blog.blogs
})
export default withRouter(connect(mapStateToProps,{getAllBlogPost,showAlert})(EditBlog));