import React from 'react'; 
import TopBar from '../../components/TopBar/TopBar';
import styles from './Home.module.css';
import HomeComp from '../../components/Home/HomeComp'
import LANG from '../../translator';

const Home = (props) => {    
    return (
        <div className={styles.container}>
            <TopBar head={LANG.DASHBOARD} />
            <HomeComp />
        </div>
    )
}

export default Home;