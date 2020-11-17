import React from 'react'
import styles from './ViewCategory.module.css';

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
import {getAllCategory} from '../../../containers/category/actions'
import {withRouter} from 'react-router-dom'


const ViewCategory = (props) => { 
    const [category,setCategory] = React.useState(props.category);
    const [showEntries,setShowEntries] = React.useState(10)


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
            rowData.push([
                index + 1,
                category.categoryName, 
                category.description,
                <Switch
                    checked={category.active}
                    onChange={() => {}} 
                    color="primary"
                />,
                <React.Fragment>
                    <Tooltip title="Edit Category">
                        <IconButton>
                            <EditRoundedIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Category">
                        <IconButton>
                            <DeleteRoundedIcon />
                        </IconButton>
                    </Tooltip>
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
                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />} onClick={() => props.history.push("/admin/category/ADD-CATEGORY")}>Add Category</Button>

                    <Button color="primary" variant="contained" endIcon={<FilterListRoundedIcon />}>Filter</Button>
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
            <TableComp 
                columns={["Sl No","Category Name","Description","Active","Action"]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    category: state.category.category
})
export default withRouter(connect(mapStateToProps,{getAllCategory})(ViewCategory));