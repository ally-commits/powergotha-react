import React from 'react'
import styles from './ViewUserDetails.module.css';

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
import {getFarmUserList,getFarmDetails,onFarmDelete} from '../../../containers/farm/actions'
import {withRouter,useLocation} from 'react-router-dom'

import ConfirmAlert from '../../utils/ConfirmAlert/ConfirmAlert'
import LANG from '../../../translator';

const ViewUserDetails = (props) => { 
    let { search } = useLocation();
    const query = new URLSearchParams(search);

    const [data,setData] = React.useState(false);
    const [farms,setFarm] = React.useState(props.farms)

    const [showEntries,setShowEntries] = React.useState(10)
    const [searchVal,setSearchVal] = React.useState("");

    React.useEffect(() => {
        props.getFarmDetails(query.get("userId"))
    },[]);

    React.useEffect(() => {
        if(query.get("userId")) {  
            setFarm(props.farms);
        }
    },[props.farms]);

    React.useEffect(() => {
        if(props.farmData) {
            if(query.get("userId")) {
                props.farmData.users.forEach(user => {
                    if(user._id == query.get("userId")) { 
                        setData(user)
                    }
                })
            } else {
                props.showAlert("Data Not Found")
                props.history.push("/admin/end-users/VIEW-END-USERS")
            }
        } else {
            setData(false);
            props.getFarmUserList();
        }
    },[props.farmData]);


    let isLoading = !farms;
    let showData = !isLoading;
    let rowData = [];
 
    !isLoading && farms.forEach((farm,index) => {
        if(index+1 <= showEntries || showEntries == "All") {
            if(farm.farmName.toLowerCase().includes(searchVal.toLowerCase()) || farm.address.toLowerCase().includes(searchVal.toLowerCase())) {
                rowData.push([
                    index + 1,
                    farm.farmName,
                    farm.pincode,
                    farm.totalArea,
                    farm.address, 
                    <React.Fragment>
                        <Tooltip title="Edit Farm">
                            <IconButton onClick={() => props.history.push("/admin/farms/EDIT-FARM?userId=" + query.get("userId") + "&farmId=" + farm._id )}>
                                <EditRoundedIcon />
                            </IconButton>
                        </Tooltip>

                        <ConfirmAlert msg={`Are you sure you want delete ${farm.farmName}`} onClickEvent={() => props.onFarmDelete(farm._id,query.get("userId"))}>
                            <Tooltip title="Delete Farm">
                                <IconButton>
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        </ConfirmAlert>
                        
                    </React.Fragment>
                ])
            }
        }
    });
  
    return (
        <div className={styles.container}>

            {data && props.farmData &&
            <div className={styles.userData}>
                <div className={styles.userContent}>
                    <div>
                        <p><span>Name: </span>{data.name}</p>
                        <p><span>Email: </span>{data.email}</p>
                        <p><span>Phone Number: </span>{data.phoneNumber}</p>
                    </div>
                    <div>
                        <p><span>Farm Count: </span>{props.farmData.countMap[data._id] && props.farmData.countMap[data._id].farmCount ? props.farmData.countMap[data._id].farmCount : 0}</p>
                        <p><span>Animal Count: </span>{props.farmData.countMap[data._id] && props.farmData.countMap[data._id].animalCount ? props.farmData.countMap[data._id].animalCount : 0}</p>
                    </div>
                </div>

                <div className={styles.profileContent}>
                    <img src={data.profilePicture} alt="" className={styles.profileImg} />
                </div>
            </div>}

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
                        label={LANG.SEARCH_HERE}
                        className={styles.search}
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                    />
                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />} onClick={() => props.history.push("/admin/farms/ADD-FARM?userId=" + query.get("userId"))}>Add Farm</Button>
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
            <TableComp 
                columns={["Sl No","Farm Name","Pincode","Total Area","Address","Action"]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    farmData: state.farm.farmData,
    farms: state.farm.farms
})
export default withRouter(connect(mapStateToProps,{getFarmUserList,onFarmDelete,getFarmDetails})(ViewUserDetails));