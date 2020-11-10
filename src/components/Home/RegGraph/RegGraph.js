import React from 'react';
import ChartistGraph from 'react-chartist'; 

const RegGraph = (props) => { 
    let date = new Date();
    let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let monthLabel = Array.from({length: lastDate},(v,k)=>k+1);

    let profUsers = {};
    let passUsers = {};

    monthLabel.forEach(val => {
      profUsers[val] = 0;
      passUsers[val] = 0;
    })

    console.log(profUsers[1])

    props.data.oneMonthPassionistUsers.forEach(val => {
      passUsers[new Date(val.createdDate).getDate()] += 1
    })

    props.data.oneMonthProfessionalUsers.forEach(val => {
      profUsers[new Date(val.createdDate).getDate()] += 1
    })

    var data = {
      labels: monthLabel,
      series: [ 
        Object.values(profUsers),
        Object.values(passUsers)
      ]
    };
 

    var options = {
      high: Math.max(...Object.values(profUsers) ,...Object.values(passUsers)) + 3,
      low: 0,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return value % 3 == 0 ? value : null;
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
        <ChartistGraph data={data} options={options} type={type} />
    )
}
 
export default RegGraph;
