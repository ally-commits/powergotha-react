import React from 'react';
import styles from './Warehouse.module.css';

import BreadCrump from '../../components/BreadCrump/BreadCrump'; 
import TopBar from '../../components/TopBar/TopBar';

import AddWarehouse from '../../components/Warehouse/AddWarehouse/AddWarehouse';
import ViewWarehouse from '../../components/Warehouse/ViewWarehouse/ViewWarehouse';
import EditWarehouse from '../../components/Warehouse/EditWarehouse/EditWarehouse';


const Category = (props) => {
    const [state,setState] = React.useState("VIEW-WAREHOUSE");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-WAREHOUSE": {
            name: "View Warehouse",
            path: "/admin/warehouse/VIEW-WAREHOUSE"
        },
        "ADD-WAREHOUSE": {
            name: "Add Warehouse",
            path: "/admin/warehouse/ADD-WAREHOUSE"
        },
        "EDIT-WAREHOUSE": {
            name: "Edit Warehouse",
            path: "/admin/warehouse/EDIT-WAREHOUSE"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head="Warehouse" />
            <BreadCrump 
                navItems={[{name:"Warehouse",path: "/admin/warehouse/VIEW-WAREHOUSE"},navData[state]]}
            />

            {state == "VIEW-WAREHOUSE" && <ViewWarehouse />}
            {state == "ADD-WAREHOUSE" && <AddWarehouse />}
            {state == "EDIT-WAREHOUSE" && <EditWarehouse />}
        </div>
    )
}

export default Category;