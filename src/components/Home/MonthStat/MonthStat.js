import React from 'react';
import ChartistGraph from 'react-chartist'; 
import Paper from '@material-ui/core/Paper'
import styles from './MonthStat.module.css';

const MonthStat = (props) => { 
    let date = new Date();
    let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let monthLabel = Array.from({length: lastDate},(v,k)=>k+1);
  

    let orders = {};
    let users = {};
    let ordersDelv = {};

    monthLabel.forEach(val => {
        orders[val] = 0;
        users[val] = 0;
        ordersDelv[val] = 0;
    });
 

    props.data.currentMonthData.users.forEach(val => {
        users[new Date(val.createdAt).getDate()] += 1;
    })

    props.data.currentMonthData.orders.forEach(val => {
        orders[new Date(val.createdAt).getDate()] += 1
    })

    props.data.currentMonthData.ordersDelv.forEach(val => {
        ordersDelv[new Date(val.createdAt).getDate()] += 1
    }) 
 

    var data = {
      labels: monthLabel,
      series: [ 
        Object.values(users),
        Object.values(orders),
        Object.values(ordersDelv),
      ]
    };
 

    var options = {
      high: Math.max(...Object.values(users) ,...Object.values(orders),...Object.values(ordersDelv)) + 1,
      low: 0,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return value % 2 == 0 ? value : null;
        }
      },
      axisY: {
        labelInterpolationFnc: function(value, index) {
          return value % 2 == 0 ? value : null;
        }
      }
    };
 
    var type = 'Line'
 
    return ( 
        <Paper variant="outlined" className={styles.container}>
          <div className={styles.header}>
            <h1>Monthly Statics</h1>
            <div className={styles.legend}>
              <p>Users  <span style={{backgroundColor: 'var(--user-stoke-color)'}}>&nbsp;</span></p>
              <p>Orders  <span style={{backgroundColor: 'var(--orders-stoke-color)'}}>&nbsp;</span></p>
              <p>Delivery  <span style={{backgroundColor: 'var(--ordersDelv-stoke-color)'}}>&nbsp;</span></p>
            </div>
          </div>
          <ChartistGraph data={data} options={options} type={type} />
        </Paper>
    )
}
 
export default MonthStat;
