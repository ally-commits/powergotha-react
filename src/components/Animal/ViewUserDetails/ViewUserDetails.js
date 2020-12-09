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
import {getAnimalUserList,getAnimalDetails,onAnimalDelete} from '../../../containers/animals/actions'
import {withRouter,useLocation} from 'react-router-dom'

import ConfirmAlert from '../../utils/ConfirmAlert/ConfirmAlert'
import LANG from '../../../translator';

const ViewUserDetails = (props) => { 
    let { search } = useLocation();
    const query = new URLSearchParams(search);

    const [data,setData] = React.useState(false);
    const [animals,setAnimals] = React.useState(props.animals)

    const [showEntries,setShowEntries] = React.useState(10)
    const [searchVal,setSearchVal] = React.useState("");

    React.useEffect(() => {
        props.getAnimalDetails(query.get("userId"))
    },[])

    React.useEffect(() => {
        if(query.get("userId")) { 
            setAnimals(props.animals);
        }
    },[props.animals]);

    React.useEffect(() => {
        if(props.animalData) {
            if(query.get("userId")) {
                props.animalData.users.forEach(user => {
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
            props.getAnimalUserList();
        }
    },[props.animalData]);


    let isLoading = !animals;
    let showData = !isLoading;
    let rowData = [];
 
    !isLoading && animals.forEach((animal,index) => {
        if(index+1 <= showEntries || showEntries == LANG.ALL) {
            if(animal.animalBreed.toLowerCase().includes(searchVal.toLowerCase()) || animal.tagNumber.toLowerCase().includes(searchVal.toLowerCase())) {
                rowData.push([
                    index + 1,
                    animal.animalBreed,
                    animal.category.categoryName,
                    animal.farm.farmName,
                    animal.tagNumber,
                    animal.dob.substr(0,10),
                    animal.weight, 
                    animal.tagNumber, 
                    animal.pregnant ? LANG.YES : LANG.NO, 
                    animal.loctating ? LANG.YES : LANG.NO, 
                    animal.bornInDairyFarm ? LANG.YES : LANG.NO, 
                    animal.purchasingPrice,
                    
                    <React.Fragment>
                        <Tooltip title={LANG.EDIT + " " +  LANG.ANIMAL}>
                            <IconButton onClick={() => props.history.push("/admin/animals/EDIT-ANIMAL?userId=" + query.get("userId") + "&animalId=" + animal._id )}>
                                <EditRoundedIcon />
                            </IconButton>
                        </Tooltip>

                        <ConfirmAlert msg={`Are you sure you want delete this animal`} onClickEvent={() => props.onAnimalDelete(animal._id,query.get("userId"))}>
                            <Tooltip title={LANG.DELETE + " " + LANG.ANIMAL}>
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

            {data && props.animalData &&
            <div className={styles.userData}>
                <div className={styles.userContent}>
                    <div>
                        <p><span>{LANG.NAME}: </span>{data.name}</p>
                        <p><span>{LANG.EMAIL}: </span>{data.email}</p>
                        <p><span>{LANG.PHONE_NUMEBR}: </span>{data.phoneNumber}</p>
                    </div>
                    <div>
                        <p><span>{LANG.ANIMAL} {LANG.COUNT}: </span>{props.animalData.animalMap[data._id] && props.animalData.animalMap[data._id].animalCount ? props.animalData.animalMap[data._id].animalCount : 0}</p>
                        <p><span>{LANG.FARN} {LANG.COUNT}: </span>{props.animalData.animalMap[data._id] && props.animalData.animalMap[data._id].animalTypeCount ? props.animalData.animalMap[data._id].animalTypeCount : 0}</p>
                    </div>
                </div>

                <div className={styles.profileContent}>
                    <img src={data.profilePicture} alt="" className={styles.profileImg} />
                </div>
            </div>}

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
                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />} onClick={() => props.history.push("/admin/animals/ADD-ANIMAL?userId=" + query.get("userId"))}>{LANG.ADD} {LANG.ANIMAL}</Button>
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
            <TableComp 
                columns={[LANG.SLNO,LANG.ANIMAL_BREED,LANG.ANIMAL_CATEGORY,LANG.FARM,LANG.DOB,LANG.WEIGHT,LANG.TAG_NUMBER,LANG.PREGNANT,LANG.LOCATING,LANG.BORN_IN_DAIRY,LANG.PRICE,LANG.ACTION]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    animalData: state.animal.animalData,
    animals: state.animal.animals
})
export default withRouter(connect(mapStateToProps,{getAnimalUserList,onAnimalDelete,getAnimalDetails})(ViewUserDetails));