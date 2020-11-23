import React from 'react'; 
import TopBar from '../../components/TopBar/TopBar';
import styles from './Home.module.css';
import HomeComp from '../../components/Home/HomeComp'

const Home = (props) => {    
 
    return (
        <div className={styles.container}>
            <TopBar head="Dashboard" />
            <HomeComp />
        </div>
    )
}

export default Home;