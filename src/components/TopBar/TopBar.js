import React from 'react';
import styles from './TopBar.module.css'
import profileImg from '../../assets/img/profile.jpg'
import Dropdown from 'react-bootstrap/Dropdown'
import Profile from './Profile/Profile';

const TopBar = (props) => {
    const [modal,setModal] = React.useState(false)
    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2>{props.head}</h2>

                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className={styles.dropDown}>
                            <img src={profileImg} alt="" className={styles.profile} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className={styles.menu}>
                            <Dropdown.Item href="#" onClick={() => setModal(true)}>Profile</Dropdown.Item>
                            <Dropdown.Item href="/login">Logout</Dropdown.Item> 
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
            </div>

            <div className={styles.spacer}>&nbsp;</div>
            
            <Profile show={modal} onHide={() => setModal(false)}/>
        </React.Fragment>
    )
}

export default TopBar;