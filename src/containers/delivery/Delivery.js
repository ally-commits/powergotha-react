import React from 'react';
import styles from './Delivery.module.css';

import BreadCrump from '../../components/BreadCrump/BreadCrump'; 
import TopBar from '../../components/TopBar/TopBar';

import AddDelivery from '../../components/Delivery/AddDelivery/AddDelivery';
import ViewDelivery from '../../components/Delivery/ViewDelivery/ViewDelivery';
import EditDelivery from '../../components/Delivery/EditDelivery/EditDelivery';


const Delivery = (props) => {
    const [state,setState] = React.useState("VIEW-DELIVERY");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-DELIVERY": {
            name: "View Delivery",
            path: "/admin/delivery/VIEW-DELIVERYS"
        },
        "ADD-DELIVERY": {
            name: "Add Delivery",
            path: "/admin/delivery/ADD-DELIVERY"
        },
        "EDIT-DELIVERY": {
            name: "Edit Delivery",
            path: "/admin/delivery/EDIT-DELIVERY"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head="Delivery Boys" />
            <BreadCrump 
                navItems={[{name:"Delivery",path: "/admin/delivery/VIEW-DELIVERY"},navData[state]]}
            />

            {state == "VIEW-DELIVERY" && <ViewDelivery />}
            {state == "ADD-DELIVERY" && <AddDelivery />}
            {state == "EDIT-DELIVERY" && <EditDelivery />}
        </div>
    )
}

export default Delivery;