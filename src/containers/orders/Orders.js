import React from 'react';
import BreadCrump from '../../components/BreadCrump/BreadCrump';  
import ViewOrders from '../../components/Orders/ViewOrders/ViewOrders';
import TopBar from '../../components/TopBar/TopBar';
import styles from './Orders.module.css';


const Orders = (props) => {
    const [state,setState] = React.useState("VIEW-ORDERS");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-ORDERS": {
            name: "View Orders",
            path: "/admin/orders/VIEW-ORDERS"
        } 
    }
    return (
        <div className={styles.container}>
            <TopBar head="Orders" />
            <BreadCrump 
                navItems={[{name:"Orders",path: "/admin/orders/VIEW-ORDERS"}]}
            />

            {state == "VIEW-ORDERS" && <ViewOrders />} 
        </div>
    )
}

export default Orders;