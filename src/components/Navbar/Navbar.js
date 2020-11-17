import React from 'react'
import styles from './navbar.module.css';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/img/logo.png'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';

const NavBar = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img src={logo} alt=""/>
                <h1>Yopaan</h1>
            </div>


            <div className={styles.navItems}>
                <NavLink className={styles.navItem} to="/admin/home" activeClassName={styles.activeNavItem}>
                    <HomeRoundedIcon />
                    <p>Home</p>
                </NavLink>

                <NavLink className={styles.navItem} to="/admin/product/VIEW-PRODUCTS" activeClassName={styles.activeNavItem}>
                    <StorefrontRoundedIcon />
                    <p>Products</p>
                </NavLink>

                <NavLink className={styles.navItem} to="/admin/category/VIEW-CATEGORY" activeClassName={styles.activeNavItem}>
                    <CategoryRoundedIcon />
                    <p>Category</p>
                </NavLink>

                <NavLink className={styles.navItem}  to="/admin/users" activeClassName={styles.activeNavItem}>
                    <GroupRoundedIcon />
                    <p>Users</p>
                </NavLink> 
            </div>
        </div>
    )
}

export default NavBar;