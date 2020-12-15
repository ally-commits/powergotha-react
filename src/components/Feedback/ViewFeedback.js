import React from 'react'
import styles from './ViewFeedback.module.css'; 

import AppLoader from '../utils/AppLoader/AppLoader';
import Content from './Content/Content'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import StarRoundedIcon from '@material-ui/icons/StarRounded';

import {connect} from 'react-redux'
import {getAllFeedback} from '../../containers/feedback/actions'
import {withRouter} from 'react-router-dom' 
import LANG from '../../translator';

const ViewFarm = (props) => { 
    const [data,setData] = React.useState(props.farmData); 
    const [filterVal,setFilterVal] = React.useState("ALL")
    const [searchVal,setSearchVal] = React.useState("")

    React.useEffect(() => {
        if(!props.feedback) { 
            props.getAllFeedback();
        }  
        setData(props.feedback);
    },[props.feedback]);


    let isLoading = !data;
    let showData = !isLoading; 
    
    let dataRender = [];
    
    showData && data.forEach(val => {
        if((val.addedBy && val.addedBy.name.toLowerCase().includes(searchVal.toLowerCase())) && (val.rating == filterVal || filterVal == "ALL")) {
            dataRender.push(
                <Content feedback={val} />
            ) 
        }
    })
    return (
        <div className={styles.container}> 

            <div className={styles.header}>
                <FormControl className={styles.input}>
                    <InputLabel id="demo-simple-select-label">{LANG.RATING}</InputLabel> 

                    <Select value={filterVal} onChange={e => setFilterVal(e.target.value)}>
                        <MenuItem value="ALL">{LANG.ALL}</MenuItem>
                        {Array(5).fill().map((val,index) => {
                            return (
                                <MenuItem value={index + 1}>
                                    {Array(index + 1).fill().map(val => {
                                        return (
                                            <StarRoundedIcon style={{color: "FFD700"}} />
                                        )
                                    })}
                                </MenuItem>
                            )
                        })} 
                    </Select>
                </FormControl>

                <TextField 
                    label={LANG.SEARCH_HERE}
                    value={searchVal}
                    className={styles.input}
                    onChange={e => setSearchVal(e.target.value)}
                />
            </div>

            {isLoading && <AppLoader />}

            {showData &&
                <React.Fragment>
                    {dataRender.length > 0
                        ?
                    <React.Fragment>
                        {dataRender}
                    </React.Fragment>
                        :
                    <div className={styles.noData}>
                        <p>{LANG.NO_FEEDBACK_FOUND}</p>
                    </div>}
                </React.Fragment>
            }

        </div>
    )
}
const mapStateToProps = state => ({
    feedback: state.feedback.feedback
})
export default withRouter(connect(mapStateToProps,{getAllFeedback})(ViewFarm));