import React from 'react'
import Card from 'react-bootstrap/Card'
import TopBar from '../TopBar/TopBar';
import AppLoader from '../utils/AppLoader/AppLoader';
import styles from './Home.module.css'
import ModalComp from './Modal/Modal';
import RegGraph from './RegGraph/RegGraph';
import {connect} from 'react-redux'
import {showAlert} from '../../containers/app/actions'
import axios from 'axios'

const Home = (props) => {
    const [modal,setModal] = React.useState(false);
    const [data,setData] = React.useState(false);

    React.useEffect(() => {
        axios({
            method: "post",
            url: "/getDashboardDetail",
        }).then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err);
            props.showAlert("Something went wrong try Again")
        })
    },[])

    const isLoading = !data;
    const showData = !isLoading;
    const postData = data && data.oneWeekPost;
    return (
        <React.Fragment>
            {modal && <ModalComp show={modal} onHide={() => setModal(false)} />}

            <TopBar head="Dashboard" />  
            <div className={styles.container}>
                {isLoading && <AppLoader />}

                {showData &&
                <React.Fragment>
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
                                <RegGraph data={data} />  
                            </div>
                        </Card>

                        <div className={styles.subContent}>
                            <Card className={styles.subCard}>
                                <p>Total posts this week by professionals</p>
                                
                                <p className={styles.profText}>Professionals</p>

                                <div className={styles.count}>
                                    <p>{data.professionalUserPostCount}</p>
                                </div>

                            </Card> 

                            <Card className={styles.subCard}>
                                <p>Total posts this week by professionals</p>
                                <p className={styles.passText}>Passionists</p>

                                <div className={styles.count}>
                                    <p>{data.passionistUserPostCount}</p>
                                </div>
                            </Card> 
                        </div>
                    </div>

                    <Card className={styles.rightContent}>
                        <p>Last 7 Days Post</p>
                        <div className={styles.images}>
                            {postData.map((val,index) => {
                                return (
                                    <div className={styles.imgContainer} key={index} onClick={() => setModal(val.postUrl)}>
                                        <img src={val.postUrl} alt="one" className={styles.imgContent} />
                                        <span className={styles.bottomHint}>{val.postTitle}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </Card>
                </React.Fragment>}
            </div> 
        </React.Fragment>
    )
}

export default connect(null,{showAlert})(Home);