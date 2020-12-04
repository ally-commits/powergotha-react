import React from 'react';
import AddBlog from '../../components/Blog/AddBlog/AddBlog';
import EditBlog from '../../components/Blog/EditBlog/EditBlog';
import ViewBlog from '../../components/Blog/ViewBlog/ViewBlog';
import ViewBlogPost from '../../components/Blog/ViewBlogPost/ViewBlogPost';
import BreadCrump from '../../components/BreadCrump/BreadCrump';  
import TopBar from '../../components/TopBar/TopBar';
import LANG from '../../translator';
import styles from './BlogPost.module.css';


const BlogPost = (props) => {
    const [state,setState] = React.useState("VIEW-BLOG");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-BLOG": {
            name: "View Blog",
            path: "/admin/blogs/VIEW-BLOG"
        },
        "ADD-BLOG": {
            name: "Add Blog",
            path: "/admin/blogs/ADD-BLOG"
        },
        "EDIT-BLOG": {
            name: "Edit Blog",
            path: "/admin/blogs/EDIT-BLOG"
        },
        "VIEW-BLOG-POST": {
            name: "View Blog Post",
            path: "/admin/blogs/VIEW-BLOG-POST"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head={LANG.BLOG_POST} />
            <BreadCrump 
                navItems={[{name:"Blog Posts",path: "/admin/blog/VIEW-BLOG"},navData[state]]}
            />

            {state == "VIEW-BLOG" && <ViewBlog />}
            {state == "ADD-BLOG" && <AddBlog/>}
            {state == "EDIT-BLOG" && <EditBlog />}
            {state == "VIEW-BLOG-POST" && <ViewBlogPost />}
            
        </div>
    )
}

export default BlogPost;