import React from 'react'
import styles from './ViewCategory.module.css';

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button' 
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

import TableComp from '../../utils/Table/Table';
import AppLoader from '../../utils/AppLoader/AppLoader';

import {connect} from 'react-redux'
import {getAllCategory,onCategoryDelete} from '../../../containers/category/actions'
import {withRouter} from 'react-router-dom'
import ConfirmAlert from '../../utils/ConfirmAlert/ConfirmAlert';
import LANG from '../../../translator';


const ViewCategory = (props) => { 
    const [category,setCategory] = React.useState(props.category);
    const [showEntries,setShowEntries] = React.useState(10)
    const [searchVal,setSearchVal] = React.useState("");

    React.useEffect(() => {
        if(!props.category) {
            props.getAllCategory();
        }
        setCategory(props.category);
    },[props.category]);

    let isLoading = !category;
    let showData = !isLoading;
    let rowData = [];

    !isLoading && category.forEach((category,index) => {
        if(index+1 <= showEntries || showEntries == "All") {
            if(category.categoryName.substring(0,10).toLowerCase().includes(searchVal.toLowerCase())){
                rowData.push([
                    index + 1,
                    category.categoryName,   
    
                    <React.Fragment>
                        <Tooltip title="Edit Category">
                            <IconButton onClick={() => props.history.push("/admin/category/EDIT-CATEGORY?categoryId="+ category._id )}>
                                <EditRoundedIcon />
                            </IconButton>
                        </Tooltip>
    
                        <ConfirmAlert msg={`Are you sure you want delete ${category.categoryName}`} onClickEvent={() => props.onCategoryDelete(category._id)}>
                            <Tooltip title="Delete Category">
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
                        label={LANG.SERACH_HERE}
                        className={styles.search}
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                    />
                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />} onClick={() => props.history.push("/admin/category/ADD-CATEGORY")}>Add Animal Category</Button>
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
            <TableComp 
                columns={["Sl No","Category Name","Action"]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    category: state.category.category
})
export default withRouter(connect(mapStateToProps,{getAllCategory,onCategoryDelete})(ViewCategory));