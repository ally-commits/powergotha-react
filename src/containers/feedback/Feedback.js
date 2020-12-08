import React from 'react';
import BreadCrump from '../../components/BreadCrump/BreadCrump'; 
import ViewFeedback from '../../components/Feedback/ViewFeedback';
 

import TopBar from '../../components/TopBar/TopBar';
import LANG from '../../translator';
import styles from './Feedback.module.css';


const Feedback = (props) => {
    const [state,setState] = React.useState("VIEW-DETAILS");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-DETAILS": {
            name: "View Details",
            path: "/user/feedback/VIEW-DETAILS"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head={LANG.FEEDBACK} />
            {/* <BreadCrump 
                navItems={[{name:"User Feedback",path: "/user/feedback/VIEW-DETAILS"},navData[state]]}
            /> */}

            {state == "VIEW-DETAILS" && <ViewFeedback />} 
        </div>
    )
}

export default Feedback;