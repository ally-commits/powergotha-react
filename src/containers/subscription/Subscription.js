import React from 'react';
import styles from './Subscription.module.css';

import BreadCrump from '../../components/BreadCrump/BreadCrump'; 
import TopBar from '../../components/TopBar/TopBar';
import LANG from '../../translator';

import ViewSubscriptions from '../../components/Subscription/ViewSubscriptions/ViewSubscriptions';
import AddSubscription from '../../components/Subscription/AddSubscription/AddSubscription';
import EditSubscription from '../../components/Subscription/EditSubscription/EditSubscription';
 
const Subscription = (props) => {
    const [state,setState] = React.useState("VIEW-SUBSCRIPTION");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-SUBSCRIPTION": {
            name: LANG.SUBSCRIPTION + " " + LANG.LIST,
            path: "/admin/subscription/VIEW-SUBSCRIPTION"
        },
        "ADD-SUBSCRIPTION": {
            name: LANG.ADD + " " + LANG.SUBSCRIPTION,
            path: "/admin/subscription/ADD-SUBSCRIPTION"
        },
        "EDIT-SUBSCRIPTION": {
            name: LANG.EDIT + " " + LANG.SUBSCRIPTION,
            path: "/admin/subscription/EDIT-SUBSCRIPTION"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head={LANG.SUBSCRIPTION} />
            <BreadCrump 
                navItems={[{name: LANG.SUBSCRIPTION,path: "/admin/subscription/VIEW-SUBSCRIPTION"},navData[state]]}
            />

            {state == "VIEW-SUBSCRIPTION" && <ViewSubscriptions />}
            {state == "ADD-SUBSCRIPTION" && <AddSubscription />} 
            {state == "EDIT-SUBSCRIPTION" && <EditSubscription />} 

        </div>
    )
}

export default Subscription;