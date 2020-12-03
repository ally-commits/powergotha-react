import React from 'react'
import styles from './navbar.module.css';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/img/logo.png'

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import NaturePeopleRoundedIcon from '@material-ui/icons/NaturePeopleRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded'; 
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded';
import PetsRoundedIcon from '@material-ui/icons/PetsRounded';

import {connect} from 'react-redux'

const NavBar = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {/* <img src={logo} alt=""/> */}
                <h1>Powergotha</h1>
            </div>


            <div className={styles.navItems}>
                <NavLink className={styles.navItem} to="/admin/home" activeClassName={styles.activeNavItem}>
                    <HomeRoundedIcon />
                    <p>CSE</p>
                </NavLink> 

                {props.auth && props.auth.userType == "ADMIN" &&
                <React.Fragment> 
                    <NavLink className={styles.navItem}  to="/admin/category/VIEW-CATEGORY" activeClassName={styles.activeNavItem}>
                        <HomeWorkRoundedIcon />
                        <p>Animal Category</p>
                    </NavLink> 

                    <NavLink className={styles.navItem}  to="/admin/end-users/VIEW-END-USER" activeClassName={styles.activeNavItem}>
                        <GroupRoundedIcon />
                        <p>End Users</p>
                    </NavLink> 

                    <NavLink className={styles.navItem}  to="/admin/farms/VIEW-DETAILS" activeClassName={styles.activeNavItem}>
                        <NaturePeopleRoundedIcon />
                        <p>Farm</p>
                    </NavLink> 

                    <NavLink className={styles.navItem}  to="/admin/animals/VIEW-DETAILS" activeClassName={styles.activeNavItem}>
                        <PetsRoundedIcon />
                        <p>Animals</p>
                    </NavLink> 
                </React.Fragment>}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.app.auth
})
export default connect(mapStateToProps)(NavBar);