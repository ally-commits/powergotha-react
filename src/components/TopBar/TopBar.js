import React from 'react';
import styles from './TopBar.module.css'
import profileImg from '../../assets/img/profile.jpg'

const TopBar = (props) => {
    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2>{props.head}</h2>

                    <img src={profileImg} alt="" className={styles.profile} />
                </div>
            </div>
            <div className={styles.spacer}>&nbsp;</div>
        </React.Fragment>
    )
}

export default TopBar;