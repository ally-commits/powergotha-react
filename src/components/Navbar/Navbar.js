import React from 'react'
import styles from './navbar.module.css';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/img/logo.png'

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import NaturePeopleRoundedIcon from '@material-ui/icons/NaturePeopleRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded'; 
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded';
import PetsRoundedIcon from '@material-ui/icons/PetsRounded';
import EditLocationRoundedIcon from '@material-ui/icons/EditLocationRounded';
import TocIcon from '@material-ui/icons/Toc';
import ContactPhoneRoundedIcon from '@material-ui/icons/ContactPhoneRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';

import {connect} from 'react-redux'

import LANG from '../../translator/index'

const NavBar = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}> 
                <h1>{LANG.APP_NAME}</h1>
            </div>


            <div className={styles.navItems}>
                <NavLink className={styles.navItem} to="/user/home" activeClassName={styles.activeNavItem}>
                    <HomeRoundedIcon />
                    <p>{LANG.DASHBOARD}</p>
                </NavLink> 
                <NavLink className={styles.navItem} to="/user/blog-post/VIEW-BLOG" activeClassName={styles.activeNavItem}>
                    <TocIcon />
                    <p>{LANG.BLOG_POST}</p>
                </NavLink> 

                <NavLink className={styles.navItem} to="/user/feedback/VIEW-DETAILS" activeClassName={styles.activeNavItem}>
                    <EditLocationRoundedIcon />
                    <p>{LANG.FEEDBACK}</p>
                </NavLink> 
                <NavLink className={styles.navItem} to="/user/chat" activeClassName={styles.activeNavItem}>
                    <ForumRoundedIcon />
                    <p>{LANG.REPLIES}</p>
                </NavLink> 

                {props.auth && props.auth.userType == "ADMIN" &&
                <React.Fragment> 
                    <NavLink className={styles.navItem}  to="/admin/category/VIEW-CATEGORY" activeClassName={styles.activeNavItem}>
                        <HomeWorkRoundedIcon />
                        <p>{LANG.ANIMAL_CATEGORY}</p>
                    </NavLink> 

                    <NavLink className={styles.navItem}  to="/admin/end-users/VIEW-END-USER" activeClassName={styles.activeNavItem}>
                        <GroupRoundedIcon />
                        <p>{LANG.USERS}</p>
                    </NavLink> 

                    <NavLink className={styles.navItem}  to="/admin/farms/VIEW-DETAILS" activeClassName={styles.activeNavItem}>
                        <NaturePeopleRoundedIcon />
                        <p>{LANG.FARM}</p>
                    </NavLink> 

                    <NavLink className={styles.navItem}  to="/admin/animals/VIEW-DETAILS" activeClassName={styles.activeNavItem}>
                        <PetsRoundedIcon />
                        <p>{LANG.ANIMAL}</p>
                    </NavLink> 

                    <NavLink className={styles.navItem}  to="/admin/cse/VIEW-CSE" activeClassName={styles.activeNavItem}>
                        <ContactPhoneRoundedIcon />
                        <p>{LANG.CSE}</p>
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