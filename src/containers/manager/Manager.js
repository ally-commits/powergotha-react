import React from 'react';
import styles from './Manager.module.css';

import BreadCrump from '../../components/BreadCrump/BreadCrump'; 
import TopBar from '../../components/TopBar/TopBar';

import AddManager from '../../components/Managers/AddManager/AddManager';
import ViewManager from '../../components/Managers/ViewManager/ViewManager';
import EditManager from '../../components/Managers/EditManager/EditManager';


const Manager = (props) => {
    const [state,setState] = React.useState("VIEW-MANAGERS");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-MANAGERS": {
            name: "View Manager",
            path: "/admin/managers/VIEW-MANAGERS"
        },
        "ADD-MANAGER": {
            name: "Add Manager",
            path: "/admin/managers/ADD-MANAGER"
        },
        "EDIT-MANAGER": {
            name: "Edit Manager",
            path: "/admin/managers/EDIT-MANAGER"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head="Managers" />
            <BreadCrump 
                navItems={[{name:"Manager",path: "/admin/managers/VIEW-MANAGERS"},navData[state]]}
            />

            {state == "VIEW-MANAGERS" && <ViewManager />}
            {state == "ADD-MANAGER" && <AddManager />}
            {state == "EDIT-MANAGER" && <EditManager />}
        </div>
    )
}

export default Manager;