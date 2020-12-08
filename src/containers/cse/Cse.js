import React from 'react';
import styles from './Cse.module.css';

import BreadCrump from '../../components/BreadCrump/BreadCrump'; 
import TopBar from '../../components/TopBar/TopBar';
import LANG from '../../translator';

import ViewUsers from '../../components/Cse/ViewUsers/ViewUsers';
import AddUser from '../../components/Cse/AddUser/AddUser';
import EditUser from '../../components/Cse/EditUser/EditUser';
 
const Cse = (props) => {
    const [state,setState] = React.useState("VIEW-CSE");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-CSE": {
            name: "View CSE",
            path: "/admin/cse/VIEW-CSE"
        },
        "ADD-CSE": {
            name: "Add CSE",
            path: "/admin/cse/ADD-CSE"
        },
        "EDIT-CSE": {
            name: "Edit CSE",
            path: "/admin/cse/EDIT-CSE"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head={LANG.CSE} />
            {/* <BreadCrump 
                navItems={[{name: LANG.CSE,path: "/admin/cse/VIEW-CSE"},navData[state]]}
            /> */}

            {state == "VIEW-CSE" && <ViewUsers />}
            {state == "ADD-CSE" && <AddUser />} 
            {state == "EDIT-CSE" && <EditUser />} 

        </div>
    )
}

export default Cse;