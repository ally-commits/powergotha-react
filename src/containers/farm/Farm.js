import React from 'react';
import BreadCrump from '../../components/BreadCrump/BreadCrump'; 

import AddFarm from '../../components/Farm/AddFarm/AddFarm';
import EditFarm from '../../components/Farm/EditFarm/EditFarm';
import ViewFarm from '../../components/Farm/ViewFarm/ViewFarm';
import ViewUserDetails from '../../components/Farm/ViewUserDetails/ViewUserDetails';

import TopBar from '../../components/TopBar/TopBar';
import LANG from '../../translator';
import styles from './Farm.module.css';
import {useLocation} from 'react-router-dom'

const Farm = (props) => {
    let { search } = useLocation();
    const query = new URLSearchParams(search);

    const [state,setState] = React.useState("VIEW-DETAILS");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-DETAILS": {
            name: LANG.FARMER_LIST,
            path: "/admin/farms/VIEW-DETAILS"
        },
        "VIEW-USER-DETAILS": {
            name: LANG.FARMER_DETAILS, 
            path: "/admin/farms/VIEW-USER-DETAILS?userId=" + query.get("userId"),
        },
        "ADD-FARM": {
            name: LANG.ADD + " " + LANG.FARM,
            path: "/admin/farms/ADD-FARM",
        },
        "EDIT-FARM": {
            name: LANG.EDIT + " " + LANG.FARM,
            path: "/admin/farms/EDIT-FARM"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head={LANG.FARM} />
            <BreadCrump 
                navItems={[
                    {name: LANG.FARM,path: "/admin/farms/VIEW-DETAILS"},
                    state == "ADD-FARM" || state == "EDIT-FARM" ? navData["VIEW-USER-DETAILS"] : false,
                    navData[state],
                ]}
            />

            {state == "VIEW-DETAILS" && <ViewFarm />}
            {state == "VIEW-USER-DETAILS" && <ViewUserDetails />}
            {state == "ADD-FARM" && <AddFarm />}
            {state == "EDIT-FARM" && <EditFarm />} 
        </div>
    )
}

export default Farm;