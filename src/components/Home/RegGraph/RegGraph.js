import React from 'react';
import ChartistGraph from 'react-chartist';
 
const RegGraph = () => { 
    var data = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [
        [1, 2, 4, 8, 6, 2, 1, 4, 6, 4],
        [10, 2, 2, 1, 0, 1, 7, 8, 1, 10]
      ]
    };
 
    var options = {
      high: 10,
      low: 0,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return value;
        }
      },
      axisY: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 == 0 ? value : null;
        }
      }
    };
 
    var type = 'Line'
 
    return ( 
        <ChartistGraph data={data} options={options} type={type} />
    )
}
 
export default RegGraph;