import React from 'react';
import styles from './Images.module.css'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

import MediaHandler from '../../../Media/MediaHandler';

const Images = (props) => {
    const [open,setOpen] = React.useState(false);

    return (
        <div className={styles.container}>
            <MediaHandler 
                open={open}
                onClose={() => setOpen(false)}
                onSelectImage={(url) => {
                    setOpen(false)
                    props.onAddImage(url)
                }}
            />

            <div className={styles.content}>
                {props.images.map((image,index) => {
                    return (
                        <div className={styles.imgContainer}>
                            <span onClick={() => props.onDeleteImage(index)}>x</span>
                            <img src={image} />
                        </div>
                    )
                })}

                <div className={styles.inputContainer} onClick={() => setOpen(true)}>
                    <AddCircleOutlineRoundedIcon style={{fontSize: 40}} />
                    <p>Add Image</p>
                </div>
            </div>
        </div>
    )
}

export default Images;