import React from 'react'
import styles from './ViewFarm.module.css';

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
 
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';

import TableComp from '../../utils/Table/Table';
import AppLoader from '../../utils/AppLoader/AppLoader';

import {connect} from 'react-redux'
import {getFarmUserList,onFarmDelete} from '../../../containers/farm/actions'
import {withRouter} from 'react-router-dom' 
import LANG from '../../../translator';

const ViewFarm = (props) => { 
    const [data,setData] = React.useState(props.farmData);
    const [showEntries,setShowEntries] = React.useState(10)
    const [searchVal,setSearchVal] = React.useState("");

    React.useEffect(() => {
        if(!props.farmData) { 
            props.getFarmUserList();
        }  
        setData(props.farmData);
    },[props.farmData]);


    let isLoading = !data;
    let showData = !isLoading;
    let rowData = [];
 
    !isLoading && data.users.forEach((user,index) => {
        if(index+1 <= showEntries || showEntries == LANG.ALL) {
            if(user.name.toLowerCase().includes(searchVal.toLowerCase()) || user.phoneNumber.toLowerCase().includes(searchVal.toLowerCase()) || 
                user.email.toLowerCase().includes(searchVal.toLowerCase()) ) {
                rowData.push([
                    index + 1,
                    user.name,
                    user.email,
                    user.phoneNumber, 
                    data.countMap[user._id] && data.countMap[user._id].farmCount ? data.countMap[user._id].farmCount : 0 ,
                    data.countMap[user._id] && data.countMap[user._id].animalCount ? data.countMap[user._id].animalCount : 0 ,
                    <React.Fragment>
                        <Tooltip title={LANG.VIEW + " " + LANG.FARMER}>
                            <IconButton onClick={() => props.history.push("/admin/farms/VIEW-USER-DETAILS?userId="+ user._id )}>
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
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
            <TableComp 
            columns={[LANG.SLNO,LANG.FARMER + " " + LANG.NAME,LANG.EMAIL,LANG.PHONE_NUMEBR,LANG.FARM + " " + LANG.COUNT ,LANG.ANIMAL + " " + LANG.COUNT, LANG.ACTION]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    farmData: state.farm.farmData
})
export default withRouter(connect(mapStateToProps,{getFarmUserList,onFarmDelete})(ViewFarm));