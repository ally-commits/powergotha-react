import React from 'react';
import ChartistGraph from 'react-chartist'; 
import Paper from '@material-ui/core/Paper'
import styles from './UserMonthStat.module.css';
import LANG from '../../../translator';

const UserMonthStat = (props) => {    
        
    let dataMaker = {}
    let count = 0;
    props.data.userMonthCount.forEach(val => {
        dataMaker[val._id.month] = val.count;
    });  

    let options = {
        high: Math.max(...Object.values(dataMaker)) + 1,
        low: 0,
        showArea: true,
        axisX: {
            labelInterpolationFnc: function(value, index) {
                return value;
            }
        },
        axisY: {
            labelInterpolationFnc: function(value, index) {
                return value % 2 == 0 ? value : null;
            }
        }
    };     
    
    console.log(Object.keys(dataMaker))
    let data = {
        labels: Object.keys(dataMaker),
        series: [Object.values(dataMaker)]
    };
    return ( 
        <Paper className={styles.container} variant="outlined">
          <div className={styles.header}>
            <h1>{LANG.MONTH_USERS}</h1> 
          </div>
          <ChartistGraph data={data} options={options} type={'Bar'} />
        </Paper>
    )
}
 
export default UserMonthStat;
