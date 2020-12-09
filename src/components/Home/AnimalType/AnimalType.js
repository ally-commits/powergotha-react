import React from 'react';
import ChartistGraph from 'react-chartist'; 
import Paper from '@material-ui/core/Paper'
import styles from './AnimalType.module.css';
import LANG from '../../../translator';

const AnimalType = (props) => {    
    let dataMaker = {}
    let catNames={}
    props.data.animalCategory.forEach(val => {
        catNames[val._id] = val.categoryName
    })

    props.data.animalCatCount.forEach(val => {
        dataMaker[catNames[val._id.category]] = val.animalCount;
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
        <Paper className={styles.container} variant="outlined" >
          <div className={styles.header}>
            <h1>{LANG.ANIMAL_LIST}</h1> 
          </div>
          <ChartistGraph data={data} options={options} type={'Bar'} />
        </Paper>
    )
}
 
export default AnimalType;
