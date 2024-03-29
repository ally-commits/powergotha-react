import React from 'react';
import styles from './EndUser.module.css';

import BreadCrump from '../../components/BreadCrump/BreadCrump'; 
import TopBar from '../../components/TopBar/TopBar';

import AddUser from '../../components/EndUsers/AddUser/AddUser';
import ViewUser from '../../components/EndUsers/ViewUser/ViewUser';
import EditUser from '../../components/EndUsers/EditUser/EditUser';
import LANG from '../../translator';


const EndUser = (props) => {
    const [state,setState] = React.useState("VIEW-END-USER");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-END-USER": {
            name: LANG.FARMER_LIST,
            path: "/admin/end-users/VIEW-END-USER"
        },
        "ADD-END-USER": {
            name: LANG.ADD + " " + LANG.FARMER,
            path: "/admin/end-users/ADD-END-USER"
        },
        "EDIT-END-USER": {
            name: LANG.ADD + " " + LANG.FARMER,
            path: "/admin/end-users/EDIT-END-USER"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head={LANG.USERS} />
            <BreadCrump 
                navItems={[{name: LANG.USERS,path: "/admin/end-users/VIEW-END-USER"},navData[state]]}
            />

            {state == "VIEW-END-USER" && <ViewUser />}
            {state == "ADD-END-USER" && <AddUser />}
            {state == "EDIT-END-USER" && <EditUser />}
        </div>
    )
}

export default EndUser;