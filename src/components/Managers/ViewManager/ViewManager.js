import React from 'react'
import styles from './ViewManager.module.css';

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button' 
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'
import Switch from '@material-ui/core/Switch'

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

import TableComp from '../../utils/Table/Table';
import AppLoader from '../../utils/AppLoader/AppLoader';

import {connect} from 'react-redux'
import {getAllManagers,onManagerDelete} from '../../../containers/manager/actions'
import {withRouter} from 'react-router-dom'
import ConfirmAlert from '../../utils/ConfirmAlert/ConfirmAlert'

const ViewManager = (props) => { 
    const [managers,setManagers] = React.useState(props.managers);
    const [showEntries,setShowEntries] = React.useState(10)


    React.useEffect(() => {
        if(!props.managers) {
            props.getAllManagers();
        }
        setManagers(props.managers);
    },[props.managers]);

    let isLoading = !managers;
    let showData = !isLoading;
    let rowData = [];

    !isLoading && managers.forEach((manager,index) => {
        if(index+1 <= showEntries || showEntries == "All") {
            rowData.push([
                index + 1,
                manager.name,
                manager.phoneNumber, 
                manager.dob.substr(0,10),
                manager.assignedWarehouse.length,
                <React.Fragment>
                    <Tooltip title="Edit Manager">
                        <IconButton onClick={() => props.history.push("/admin/managers/EDIT-MANAGER?userId="+ manager._id )}>
                            <EditRoundedIcon />
                        </IconButton>
                    </Tooltip>

                    <ConfirmAlert msg={`Are you sure you want delete ${manager.name}`} onClickEvent={() => props.onManagerDelete(manager._id)}>
                        <Tooltip title="Delete Manager">
                            <IconButton>
                                <DeleteRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </ConfirmAlert>
                    
                </React.Fragment>
            ])
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
                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />} onClick={() => props.history.push("/admin/managers/ADD-MANAGER")}>Add Manager</Button>

                    <Button color="primary" variant="contained" endIcon={<FilterListRoundedIcon />}>Filter</Button>
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
            <TableComp 
                columns={["Sl No","Manager Name","Phone Number","Date OF Birth","Count[Warehouse]","Action"]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    managers: state.manager.managers
})
export default withRouter(connect(mapStateToProps,{getAllManagers,onManagerDelete})(ViewManager));