import React from 'react'
import styles from './ViewUsers.module.css';

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button' 
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded'; 
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

import TableComp from '../../utils/Table/Table';
import AppLoader from '../../utils/AppLoader/AppLoader';

import {connect} from 'react-redux'
import {getAllUsers,onUserDelete} from '../../../containers/cse/actions'
import {withRouter} from 'react-router-dom'
import ConfirmAlert from '../../utils/ConfirmAlert/ConfirmAlert'
import LANG from '../../../translator';

const ViewUsers = (props) => { 
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
        if(index+1 <= showEntries || showEntries == LANG.ALL) {
            if(user.name.toLowerCase().includes(searchVal.toLowerCase()) || user.phoneNumber.toLowerCase().includes(searchVal.toLowerCase())) {
                
                rowData.push([
                    index + 1,
                    user.name,
                    user.phoneNumber, 
                    user.userType,
                    user.createdAt.substr(0,10), 
                    <React.Fragment>
                        <Tooltip title={LANG.EDIT + " " + LANG.CSE}>
                            <IconButton onClick={() => props.history.push("/admin/cse/EDIT-CSE?userId="+ user._id )}>
                                <EditRoundedIcon />
                            </IconButton>
                        </Tooltip>
    
                        <ConfirmAlert msg={`Are you sure you want delete ${user.name}`} onClickEvent={() => props.onUserDelete(user._id)}>
                            <Tooltip title={LANG.DELETE + " " + LANG.CSE}>
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
                    <p>{LANG.SHOWENTRIES}</p>
                    <Select value={showEntries} onChange={e => setShowEntries(e.target.value)}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={30}>50</MenuItem>
                        <MenuItem value={LANG.ALL}>{LANG.ALL}</MenuItem>
                    </Select>
                </div>

                <div className={styles.rightHeader}>
                    <TextField
                        label={LANG.SEARCH_HERE}
                        className={styles.search}
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                    />

                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />} onClick={() => props.history.push("/admin/cse/ADD-CSE")}>{LANG.ADD} {LANG.CSE}</Button>
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
            <TableComp 
                columns={[LANG.SLNO,LANG.NAME,LANG.PHONE_NUMEBR,LANG.TYPE,LANG.CREATEDAT,LANG.ACTION]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    users: state.cse.users
})
export default withRouter(connect(mapStateToProps,{getAllUsers,onUserDelete})(ViewUsers));