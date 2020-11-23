import React from 'react';
import ChartistGraph from 'react-chartist'; 
import Paper from '@material-ui/core/Paper'
import styles from './WarehouseStat.module.css';

const Graph = (props) => {   
    let dataMaker = {}

    props.data.forEach(val => {
        dataMaker[val.warehouseId.warehouseName] ? dataMaker[val.warehouseId.warehouseName] += 1 : dataMaker[val.warehouseId.warehouseName] = 1; 
    });
      
    console.log(dataMaker)
 
    var data = {
        labels: Object.keys(dataMaker),
        series: Object.values(dataMaker)
    };
 
    var type = 'Pie'
    var options = {
        donut: true,
    }
 
    return ( 
        <Paper className={styles.container} variant="outlined">
          <div className={styles.header}>
            <h1>Warehouse Product Count</h1> 
          </div>
          <ChartistGraph data={data} type={type} options={options} />
        </Paper>
    )
}
 
export default Graph;
