import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button'
import {storage} from '../../App'
import styles from './Media.module.css'
import { CircularProgress } from '@material-ui/core';
import {getAllImages,addImage} from '../../containers/app/actions'
import {connect} from 'react-redux'


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MediaHandler = (props) => {
    const classes = useStyles(); 
    const [images,setImages] = React.useState(false)
    const [progress,setProgress] = React.useState(false);

    React.useEffect(() => {
        if(!props.images)  {
            props.getAllImages();
        }
    },[])

    React.useEffect(() => {
        setImages(props.images)
    },[props.images])
 
    const handleImageUpload = (e) => {
        const img = e.target.files[0];
        if(img) {
            const uploadTask = storage.ref(`/product-images/${img.name}`).put(img);
            uploadTask.on('state_changed', 
                (snapShot) => { 
                    setProgress(true);
                }, 
                (err) => { 
                    console.log(err)
                    setProgress(false);
                },
                () => { 
                storage.ref('product-images').child(img.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        setProgress(false); 
                        props.addImage(fireBaseUrl) 
                    })
                })
        }
    } 
    let showLoading = !images;
    let showContent = !showLoading;

    return ( 
        <Dialog fullScreen open={props.open} onClose={props.onClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
            <Toolbar className={styles.toolbar}>
                <div className={styles.alignCenter}>
                    <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton> 
                    <h4>Media Library</h4>
                </div>

                <div className={styles.buttons}>
                    <input type={"file"} onChange={handleImageUpload} />
                    <Button color="secondary" variant="contained"
                        endIcon={progress && <CircularProgress size={20} />}
                    >Add New Image</Button>
                </div>
            </Toolbar>
            </AppBar>
            <div className={styles.content}>
                
                {showLoading &&
                    <div className={styles.loader}>
                        <CircularProgress />
                    </div>}

                {showContent &&
                    <div className={styles.container}>
                        {images.map((val,index) => {
                            return (
                                <img src={val} className={styles.imgContent} key={index} onClick={() => props.onSelectImage(val)}/>
                            )
                        })}
                    </div>
                }
            </div>
        </Dialog>
    );
}
const mapStateToProps = state => ({
    images: state.app.images
})

export default connect(mapStateToProps,{getAllImages,addImage})(MediaHandler);