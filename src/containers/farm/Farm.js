import React from 'react';
import BreadCrump from '../../components/BreadCrump/BreadCrump'; 

import AddFarm from '../../components/Farm/AddFarm/AddFarm';
import EditFarm from '../../components/Farm/EditFarm/EditFarm';
import ViewFarm from '../../components/Farm/ViewFarm/ViewFarm';
import ViewUserDetails from '../../components/Farm/ViewUserDetails/ViewUserDetails';

import TopBar from '../../components/TopBar/TopBar';
import LANG from '../../translator';
import styles from './Farm.module.css';


const Farm = (props) => {
    const [state,setState] = React.useState("VIEW-DETAILS");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-DETAILS": {
            name: "View Details",
            path: "/admin/farms/VIEW-DETAILS"
        },
        "VIEW-USER-DETAILS": {
            name: "View User Details",
            path: "/admin/farms/VIEW-USER-DETAILS"
        },
        "ADD-FARM": {
            name: "Add Farm",
            path: "/admin/farms/ADD-FARM"
        },
        "EDIT-FARM": {
            name: "Edit Farm",
            path: "/admin/farms/EDIT-FARM"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head={LANG.FARM} />
            <BreadCrump 
                navItems={[{name:"User List",path: "/admin/farms/VIEW-DETAILS"},navData[state]]}
            />

            {state == "VIEW-DETAILS" && <ViewFarm />}
            {state == "VIEW-USER-DETAILS" && <ViewUserDetails />}
            {state == "ADD-FARM" && <AddFarm />}
            {state == "EDIT-FARM" && <EditFarm />} 
        </div>
    )
}

export default Farm;