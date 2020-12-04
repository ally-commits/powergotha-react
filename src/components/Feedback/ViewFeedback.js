import React from 'react'
import styles from './ViewFeedback.module.css'; 

import AppLoader from '../utils/AppLoader/AppLoader';
import Content from './Content/Content'

import {connect} from 'react-redux'
import {getAllFeedback} from '../../containers/feedback/actions'
import {withRouter} from 'react-router-dom' 

const ViewFarm = (props) => { 
    const [data,setData] = React.useState(props.farmData); 

    React.useEffect(() => {
        if(!props.feedback) { 
            props.getAllFeedback();
        }  
        setData(props.feedback);
    },[props.feedback]);


    let isLoading = !data;
    let showData = !isLoading; 
 
    return (
        <div className={styles.container}> 
            {isLoading && <AppLoader />}

            {showData &&
                <React.Fragment>
                    {data.map(val => {
                        return (
                            <Content feedback={val} />
                        )
                    })}
                </React.Fragment>
            }

        </div>
    )
}
const mapStateToProps = state => ({
    feedback: state.feedback.feedback
})
export default withRouter(connect(mapStateToProps,{getAllFeedback})(ViewFarm));