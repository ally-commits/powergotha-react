import React from 'react'
import styles from './ViewOrders.module.css';

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'
 
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded'; 

import TableComp from '../../utils/Table/Table';
import AppLoader from '../../utils/AppLoader/AppLoader';

import {connect} from 'react-redux'
import {getAllOrders} from '../../../containers/orders/actions'
import {withRouter} from 'react-router-dom' 
import OrderDetail from './OrderDetail/OrderDetail';

const ViewOrders = (props) => { 
    const [orders,setOrders] = React.useState(props.orders);
    const [showEntries,setShowEntries] = React.useState(10);
    const [activeOrder,setActiveOrder] = React.useState(false);
    const [searchVal,setSearchVal] = React.useState("");

    React.useEffect(() => {
        if(!props.orders) {
            props.getAllOrders();
        }
        setOrders(props.orders);
    },[props.orders]);

    let isLoading = !orders;
    let showData = !isLoading;
    let rowData = [];

    !isLoading && orders.forEach((order,index) => {
        if(index+1 <= showEntries || showEntries == "All") {
            if(order.orderDate.substring(0,10).toLowerCase().includes(searchVal.toLowerCase()) || order.orderStatus.toLowerCase().includes(searchVal.toLowerCase()) 
            || order.userId.name.toLowerCase().includes(searchVal.toLowerCase()) || order.userId.phoneNumber.toLowerCase().includes(searchVal.toLowerCase())){

                rowData.push([
                    index + 1,
                    order.orderDate.substring(0,10),
                    order.orderStatus == "CANCELLED"
                        ?
                    <span className={styles.textRed}>CANCELLED</span>
                        :
                    <span className={styles.textGreen}>{order.orderStatus}</span>,

                    order.orderItems.length,

                    order.userId.name,
                    order.userId.phoneNumber, 

                    <React.Fragment>
                        <Tooltip title="View Order">
                            <IconButton onClick={() => setActiveOrder(order)}>
                                <VisibilityRoundedIcon />
                            </IconButton>
                        </Tooltip> 
                    </React.Fragment>
                ])
            }
        }
    });
 
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.leftHeader}>
                    <p>Show Entires</p>
                    <Select value={showEntries} onChange={e => setShowEntries(e.target.value)}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={30}>50</MenuItem>
                        <MenuItem value={"All"}>All</MenuItem>
                    </Select>
                </div>

                <div className={styles.rightHeader}>
                    <TextField
                        label="Search Here"
                        className={styles.search}
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                    />
                </div>
            </div>

            {isLoading && <AppLoader />}

            {activeOrder && <OrderDetail activeOrder={activeOrder} onClose={() => setActiveOrder(false)} />}

            {showData &&
            <TableComp 
                columns={["Sl No","Order date","Order Status","Ordered Products","Customer Name","Phone Number","Action"]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    orders: state.orders.orders
})
export default withRouter(connect(mapStateToProps,{getAllOrders})(ViewOrders));