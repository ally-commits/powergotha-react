import React from 'react'
import styles from './navbar.module.css';
import {HouseFill,PersonCheckFill,PersonFill,CashStack} from 'react-bootstrap-icons'
import {NavLink} from 'react-router-dom';

const NavBar = (props) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.head}>Hobbyit</h1>

            <div className={styles.navItems}>
                <NavLink className={styles.navItem} to="/admin/home" activeClassName={styles.activeNavItem}>
                    <HouseFill />
                    <p>Home</p>
                </NavLink>

                <NavLink className={styles.navItem} to="/admin/professionals" activeClassName={styles.activeNavItem}>
                    <PersonCheckFill />
                    <p>Professionals</p>
                </NavLink>

                <NavLink className={styles.navItem}  to="/admin/passionists" activeClassName={styles.activeNavItem}>
                    <PersonFill />
                    <p>Passionists</p>
                </NavLink>

                <NavLink className={styles.navItem}  to="/admin/transactions" activeClassName={styles.activeNavItem}>
                    <CashStack />
                    <p>Transactions</p>
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar;