import React from 'react';
import styles from './Doctor.module.css';

import BreadCrump from '../../components/BreadCrump/BreadCrump'; 
import TopBar from '../../components/TopBar/TopBar';
import LANG from '../../translator';

import ViewDoctors from '../../components/Doctor/ViewDoctors/ViewDoctors';
import AddDoctor from '../../components/Doctor/AddDoctor/AddDoctor';
import EditDoctor from '../../components/Doctor/EditDoctor/EditDoctor';
 
const Doctor = (props) => {
    const [state,setState] = React.useState("VIEW-Doctor");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-DOCTOR": {
            name: LANG.DOCTOR + " " + LANG.LIST,
            path: "/admin/doctor/VIEW-DOCTOR"
        },
        "ADD-DOCTOR": {
            name: LANG.ADD + " " + LANG.DOCTOR,
            path: "/admin/doctor/ADD-DOCTOR"
        },
        "EDIT-DOCTOR": {
            name: LANG.EDIT + " " + LANG.DOCTOR,
            path: "/admin/doctor/EDIT-DOCTOR"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head={LANG.DOCTOR} />
            <BreadCrump 
                navItems={[{name: LANG.DOCTOR,path: "/admin/doctor/VIEW-DOCTOR"},navData[state]]}
            />

            {state == "VIEW-DOCTOR" && <ViewDoctors />}
            {state == "ADD-DOCTOR" && <AddDoctor />} 
            {state == "EDIT-DOCTOR" && <EditDoctor />} 

        </div>
    )
}

export default Doctor;