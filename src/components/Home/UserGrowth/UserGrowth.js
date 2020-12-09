import React from 'react';
import ChartistGraph from 'react-chartist'; 
import Paper from '@material-ui/core/Paper'
import styles from './UserGrowth.module.css';
import LANG from '../../../translator';

const UserGrowth = (props) => {   
    let dataMaker = {}
    let count = 0;
    props.data.users.forEach(val => {
        count += 1;
        dataMaker[val.createdAt.substr(0,10)] = count;
    }); 

    var options = {
      high: Math.max(...Object.values(dataMaker)) + 1,
      low: 0,
      showArea: true,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return null;
        }
      },
      axisY: {
        labelInterpolationFnc: function(value, index) {
          return value % 2 == 0 ? value : null;
        }
      }
    };

    var data = {
        labels: Object.keys(dataMaker),
        series: [Object.values(dataMaker)]
    };
 
 
    var type = 'Line'
 
    return ( 
        <Paper className={styles.container} variant="outlined">
          <div className={styles.header}>
            <h1>{LANG.NUMBER_OF_USERS}</h1> 
          </div>
          <ChartistGraph data={data} options={options} type={type} />
        </Paper>
    )
}
 
export default UserGrowth;
