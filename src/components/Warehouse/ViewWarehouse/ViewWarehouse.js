import React from 'react'
import styles from './ViewWarehouse.module.css';

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
import {getAllWarehouse,onWarehouseDelete} from '../../../containers/warehouse/actions'
import {withRouter} from 'react-router-dom'
import ConfirmAlert from '../../utils/ConfirmAlert/ConfirmAlert'

const ViewWarehouse = (props) => { 
    const [warehouse,setWarehouse] = React.useState(props.warehouse);
    const [showEntries,setShowEntries] = React.useState(10)


    React.useEffect(() => {
        if(!props.warehouse) {
            props.getAllWarehouse();
        }
        setWarehouse(props.warehouse);
    },[props.warehouse]);

    let isLoading = !warehouse;
    let showData = !isLoading;
    let rowData = [];

    !isLoading && warehouse.forEach((warehouse,index) => {
        if(index+1 <= showEntries || showEntries == "All") {
            rowData.push([
                index + 1,
                warehouse.warehouseName,
                warehouse.coordinates.join("-"),
                <React.Fragment>
                    <Tooltip title="Edit Warehouse">
                        <IconButton onClick={() => props.history.push("/admin/warehouse/EDIT-WAREHOUSE?warehouseId="+ warehouse._id )}>
                            <EditRoundedIcon />
                        </IconButton>
                    </Tooltip>

                    <ConfirmAlert msg={`Are you sure you want delete ${warehouse.warehouseName}`} onClickEvent={() => props.onWarehouseDelete(warehouse._id)}>
                        <Tooltip title="Delete Warehouse">
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
                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />} onClick={() => props.history.push("/admin/warehouse/ADD-WAREHOUSE")}>Add Warehouse</Button>

                    <Button color="primary" variant="contained" endIcon={<FilterListRoundedIcon />}>Filter</Button>
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
            <TableComp 
                columns={["Sl No","Warehouse Name","Coordinates","Action"]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    warehouse: state.warehouse.warehouse
})
export default withRouter(connect(mapStateToProps,{getAllWarehouse,onWarehouseDelete})(ViewWarehouse));