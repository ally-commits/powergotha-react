import React from 'react'
import styles from './ViewDelivery.module.css';

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button' 
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

import TableComp from '../../utils/Table/Table';
import AppLoader from '../../utils/AppLoader/AppLoader';

import {connect} from 'react-redux'
import {getAllUsers,onUserDelete} from '../../../containers/delivery/actions'
import {withRouter} from 'react-router-dom'
import ConfirmAlert from '../../utils/ConfirmAlert/ConfirmAlert'

const ViewDelivery = (props) => { 
    const [users,setUsers] = React.useState(props.users);
    const [showEntries,setShowEntries] = React.useState(10)
    const [searchVal,setSearchVal] = React.useState("");

    React.useEffect(() => {
        if(!props.users) {
            props.getAllUsers();
        }
        setUsers(props.users);
    },[props.users]);

    let isLoading = !users;
    let showData = !isLoading;
    let rowData = [];

    !isLoading && users.forEach((user,index) => {
        if(index+1 <= showEntries || showEntries == "All") {
            if(user.name.toLowerCase().includes(searchVal.toLowerCase()) || user.phoneNumber.toLowerCase().includes(searchVal.toLowerCase()) 
            || user.dob.substr(0,10).toLowerCase().includes(searchVal.toLowerCase()) || user.assignedWarehouse[0].warehouseName.toLowerCase().includes(searchVal.toLowerCase())) {
                
                rowData.push([
                    index + 1,
                    user.name,
                    user.phoneNumber, 
                    user.dob.substr(0,10),
                    user.assignedWarehouse ? user.assignedWarehouse[0].warehouseName : "----",
                    <React.Fragment>
                        <Tooltip title="Edit User">
                            <IconButton onClick={() => props.history.push("/admin/delivery/EDIT-DELIVERY?userId="+ user._id )}>
                                <EditRoundedIcon />
                            </IconButton>
                        </Tooltip>
    
                        <ConfirmAlert msg={`Are you sure you want delete ${user.name}`} onClickEvent={() => props.onUserDelete(user._id)}>
                            <Tooltip title="Delete User">
                                <IconButton>
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        </ConfirmAlert>
                        
                    </React.Fragment>
                ]);
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

                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />} onClick={() => props.history.push("/admin/delivery/ADD-DELIVERY")}>Add Delivery Boy</Button>
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
            <TableComp 
                columns={["Sl No","Name","Phone Number","Date OF Birth","Warehouse","Action"]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    users: state.delivery.users
})
export default withRouter(connect(mapStateToProps,{getAllUsers,onUserDelete})(ViewDelivery));