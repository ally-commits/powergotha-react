import React from 'react'

import AppLoader from '../utils/AppLoader/AppLoader';
import styles from './Home.module.css'

import {connect} from 'react-redux'
import {showAlert} from '../../containers/app/actions'
import {getAllData} from '../../containers/home/actions'

import MonthStat from './MonthStat/MonthStat'

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
                <MonthStat data={props.data} />
            </React.Fragment>}
        </div>  
    )
}
const mapStateToProps = state => ({
    data: state.home.data
})
export default connect(mapStateToProps,{showAlert,getAllData})(HomeComp);