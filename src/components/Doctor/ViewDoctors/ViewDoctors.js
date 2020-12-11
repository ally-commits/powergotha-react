import React from 'react'
import styles from './ViewDoctors.module.css';

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
import {getAllDoctors,onDoctorDelete} from '../../../containers/doctor/actions'
import {withRouter} from 'react-router-dom'
import ConfirmAlert from '../../utils/ConfirmAlert/ConfirmAlert'
import LANG from '../../../translator';

const ViewDoctors = (props) => { 
    const [doctors,setDoctors] = React.useState(props.doctors);
    const [showEntries,setShowEntries] = React.useState(10)
    const [searchVal,setSearchVal] = React.useState("");

    React.useEffect(() => {
        if(!props.doctors) {
            props.getAllDoctors();
        }
        setDoctors(props.doctors);
    },[props.doctors]);

    let isLoading = !doctors;
    let showData = !isLoading;
    let rowData = [];

    !isLoading && doctors.forEach((doctor,index) => {
        if(index+1 <= showEntries || showEntries == LANG.ALL) {
            if(doctor.name.toLowerCase().includes(searchVal.toLowerCase()) || doctor.phoneNumber.toLowerCase().includes(searchVal.toLowerCase())) {
                
                rowData.push([
                    index + 1,
                    doctor.name,
                    doctor.phoneNumber, 
                    doctor.email, 
                    doctor.createdAt.substr(0,10), 
                    <React.Fragment>
                        <Tooltip title={LANG.EDIT + " " + LANG.DOCTOR}>
                            <IconButton onClick={() => props.history.push("/admin/doctor/EDIT-DOCTOR?doctorId="+ doctor._id )}>
                                <EditRoundedIcon />
                            </IconButton>
                        </Tooltip>
    
                        <ConfirmAlert msg={`Are you sure you want delete ${doctor.name}`} onClickEvent={() => props.onDoctorDelete(doctor._id)}>
                            <Tooltip title={LANG.DELETE + " " + LANG.DOCTOR}>
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

                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />} onClick={() => props.history.push("/admin/doctor/ADD-DOCTOR")}>{LANG.ADD} {LANG.DOCTOR}</Button>
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
            <TableComp 
                columns={[LANG.SLNO,LANG.NAME,LANG.PHONE_NUMEBR,LANG.EMAIL,LANG.CREATEDAT,LANG.ACTION]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    doctors: state.doctor.doctors
})
export default withRouter(connect(mapStateToProps,{getAllDoctors,onDoctorDelete})(ViewDoctors));