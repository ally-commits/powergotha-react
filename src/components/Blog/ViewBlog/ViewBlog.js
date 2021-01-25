import React from 'react'
import styles from './ViewBlog.module.css';

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button' 
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'; 

import TableComp from '../../utils/Table/Table';
import AppLoader from '../../utils/AppLoader/AppLoader';

import {connect} from 'react-redux'
import {getAllBlogPost,onBlogDelete} from '../../../containers/blogpost/actions'
import {withRouter} from 'react-router-dom'
import ConfirmAlert from '../../utils/ConfirmAlert/ConfirmAlert';
import LANG from '../../../translator';


const ViewBlog = (props) => { 
    const [blogs,setBlogs] = React.useState(props.blogs);
    const [showEntries,setShowEntries] = React.useState(10)
    const [searchVal,setSearchVal] = React.useState("");

    React.useEffect(() => {
        if(!props.blogs) {
            props.getAllBlogPost();
        }
        setBlogs(props.blogs);
    },[props.blogs]);

    let isLoading = !blogs;
    let showData = !isLoading;
    let rowData = [];

    !isLoading &&  blogs.forEach((blog,index) => {
        if(index+1 <= showEntries || showEntries == LANG.ALL) {
            if(blog.title && blog.title.substring(0,10).toLowerCase().includes(searchVal.toLowerCase())){
                rowData.push([
                    index + 1,
                    blog.title.substring(0,30) + " " + (blog.title.length > 30 ? "...." : ""),
                    blog.createdAt.substring(0,10),
                    blog.addedBy ? blog.addedBy.name : "----",   
                    <React.Fragment>
                        <Tooltip title={LANG.VIEW + " " + LANG.BLOG_POST}>
                            <IconButton onClick={() => props.history.push("/user/blog-post/VIEW-BLOG-POST?blogId="+ blog._id )}>
                                <VisibilityRoundedIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={LANG.EDIT + " " + LANG.BLOG_POST}>
                            <IconButton onClick={() => props.history.push("/user/blog-post/EDIT-BLOG?blogId="+ blog._id )}>
                                <EditRoundedIcon />
                            </IconButton>
                        </Tooltip>
    
                        <ConfirmAlert msg={`Are you sure you want delete this blog`} onClickEvent={() => props.onBlogDelete(blog._id)}>
                            <Tooltip title={LANG.DELETE + " " + LANG.BLOG_POST}>
                                <IconButton>
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        </ConfirmAlert>
                    </React.Fragment>
                ])
            }
        }
    });
 
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.leftHeader}>
                    <p>{LANG.SHOWENTRIES}</p>
                    <Select value={showEntries} onChange={e => setShowEntries(e.target.value)}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={30}>50</MenuItem>
                        <MenuItem value={LANG.ALL}>{LANG.ALL}</MenuItem>
                    </Select>
                </div>

                <div className={styles.rightHeader}>
                    <TextField
                        label={LANG.SEARCH_HERE}
                        className={styles.search}
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                    />
                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />} onClick={() => props.history.push("/user/blog-post/ADD-BLOG")}>{LANG.ADD}  {LANG.BLOG_POST}</Button>
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
            <TableComp 
                columns={[LANG.SLNO,LANG.TITLE,LANG.CREATEDAT,LANG.ADDEDBY,LANG.ACTION]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    blogs: state.blog.blogs
})
export default withRouter(connect(mapStateToProps,{getAllBlogPost,onBlogDelete})(ViewBlog));