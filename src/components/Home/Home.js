import React from 'react'
import Card from 'react-bootstrap/Card'
import { images } from '../../data';
import TopBar from '../TopBar/TopBar';
import styles from './Home.module.css'
import ModalComp from './Modal/Modal';
import RegGraph from './RegGraph/RegGraph';


const Home = () => {
    const [modal,setModal] = React.useState(false);

    return (
        <React.Fragment>
            {modal && <ModalComp show={modal} onHide={() => setModal(false)} />}

            <TopBar head="Dashboard" />  
            <div className={styles.container}>
                <div className={styles.leftContent}>
                    <Card className={styles.regGraphCard}> 
                        <div className={styles.header}>
                            <p>Users Registred in last 1 month</p>

                            <div className={styles.alignContent}> 
                                <div className={styles.element}>
                                    <span>&nbsp;</span>
                                    <p>Professionals</p>
                                </div>

                                <div className={styles.element}>
                                    <span>&nbsp;</span>
                                    <p>Passionists</p>
                                </div>

                            </div>
                        </div>
                        
                        <div className={styles.contentGraph}>
                            <RegGraph /> 
                        </div>
                    </Card>

                    <div className={styles.subContent}>
                        <Card className={styles.subCard}>
                            <p>Total posts this week by professionals</p>
                            
                            <p className={styles.profText}>Professionals</p>

                            <div className={styles.count}>
                                <p>87</p>
                            </div>

                        </Card> 

                        <Card className={styles.subCard}>
                            <p>Total posts this week by professionals</p>
                            <p className={styles.passText}>Passionists</p>

                            <div className={styles.count}>
                                <p>76</p>
                            </div>
                        </Card> 
                    </div>
                </div>

                <Card className={styles.rightContent}>
                    <p>Last 7 Days Post</p>
                    <div className={styles.images}>
                        {images.map((url,index) => {
                            return (
                                <div className={styles.imgContainer} key={index} onClick={() => setModal(url)}>
                                    <img src={url} alt="one" className={styles.imgContent} />
                                    <span className={styles.bottomHint}>Lorem, ipsum.</span>
                                </div>
                            )
                        })}
                    </div>
                </Card>
            </div> 
        </React.Fragment>
    )
}

export default Home;