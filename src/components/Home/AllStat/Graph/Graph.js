import React from 'react';
import ChartistGraph from 'react-chartist'; 
import Paper from '@material-ui/core/Paper'
import styles from './Graph.module.css';

const Graph = (props) => {   
    let dataMaker = {}
    let count = 0;
    props.data.forEach(val => {
        count += 1;
        dataMaker[val.createdAt.substr(0,10)] = count;
    });
     
    const returnValidData = () => {
        let arr = [Object.values(dataMaker)];
        if(props.head == "Orders") {
            arr.unshift([])
        }
        if(props.head == "Orders Delivered") {
            arr.unshift([])
            arr.unshift([])
        }
        return [...arr]
    }  
 
    var data = {
        labels: Object.keys(dataMaker),
        series: returnValidData()
    };
 

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
 
    var type = 'Line'
 
    return ( 
        <div className={props.style} >
          <div className={styles.header}>
            <h1>{props.head}</h1> 
          </div>
          <ChartistGraph data={data} options={options} type={type} />
        </div>
    )
}
 
export default Graph;
