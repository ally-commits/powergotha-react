import React from 'react'

import AppLoader from '../utils/AppLoader/AppLoader';
import styles from './Home.module.css'

import {connect} from 'react-redux'
import {showAlert} from '../../containers/app/actions'
import {getAllData} from '../../containers/home/actions'
 
import UserGrowth from './UserGrowth/UserGrowth';
import UserMonthStat from './UserMonthStat/UserMonthStat';
import UserActive from './UserActive/UserActive'; 
import AnimalType from './AnimalType/AnimalType';

import Paper from '@material-ui/core/Paper'
import LANG from '../../translator';

import welcomeBg from '../../assets/img/welcome.svg'


const HomeComp = (props) => { 
    React.useEffect(() => {
        if(!props.data) {
            props.getAllData()
        }
    },[props.data]);

    const isLoading = !props.data;
    const showData = !isLoading; 
    return ( 
        <div className={styles.container}>
            {isLoading && <AppLoader />}

            {showData &&
            <React.Fragment>
                <div className={styles.header}>
                    <h1>{LANG.WELCOME}</h1>

                    <img src={welcomeBg} alt=""/>
                </div>
                <div className={styles.row}>
                    <UserGrowth data={props.data} />
                    <UserMonthStat data={props.data}/>
                </div>

                <div className={styles.row}>
                    <UserActive data={props.data} /> 
                    <AnimalType data={props.data}/>
                </div>

                <div className={styles.row}>
                    <Paper variant="outlined" className={styles.card}>
                        <h1>{LANG.TOTAL_FARMS}</h1>

                        <h2>{props.data.farmCount}</h2>
                    </Paper>

                    <Paper variant="outlined" className={styles.card}>
                        <h1>{LANG.TOTAL_ANIMALS}</h1>

                        <h2>{props.data.animalCount}</h2>
                    </Paper>
                    <Paper variant="outlined" className={styles.card}>
                        <h1>{LANG.ACRE_AREA}</h1>
                        <h2>104</h2>
                    </Paper>
                    <Paper variant="outlined" className={styles.card}>
                        <h1>{LANG.DOWNLOADS}</h1>
                        <h2>1021</h2>
                    </Paper>
                </div>
                
            </React.Fragment>}
        </div>  
    )
}
const mapStateToProps = state => ({
    data: state.home.data
})
export default connect(mapStateToProps,{showAlert,getAllData})(HomeComp);