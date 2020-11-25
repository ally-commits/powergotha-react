import React from 'react'
import styles from './navbar.module.css';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/img/logo.png'

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import DirectionsBikeRoundedIcon from '@material-ui/icons/DirectionsBikeRounded';
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded';
import MapRoundedIcon from '@material-ui/icons/MapRounded';
import {connect} from 'react-redux'

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

                <NavLink className={styles.navItem} to="/admin/delivery/VIEW-DELIVERY" activeClassName={styles.activeNavItem}>
                    <DirectionsBikeRoundedIcon />
                    <p>Delivery Boys</p>
                </NavLink>

                <NavLink className={styles.navItem} to="/admin/orders/VIEW-ORDERS" activeClassName={styles.activeNavItem}>
                    <ShoppingBasketRoundedIcon />
                    <p>Orders</p>
                </NavLink>

                {props.auth && props.auth.userType == "ADMIN" &&
                <React.Fragment>
                    <NavLink className={styles.navItem}  to="/admin/view-map" activeClassName={styles.activeNavItem}>
                        <MapRoundedIcon />
                        <p>Map</p>
                    </NavLink> 

                    <NavLink className={styles.navItem}  to="/admin/managers/VIEW-MANAGERS" activeClassName={styles.activeNavItem}>
                        <GroupRoundedIcon />
                        <p>Managers</p>
                    </NavLink> 
                    
                    <NavLink className={styles.navItem}  to="/admin/warehouse/VIEW-WAREHOUSE" activeClassName={styles.activeNavItem}>
                        <HomeWorkRoundedIcon />
                        <p>Warehouse</p>
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