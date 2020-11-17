import React from 'react'
import styles from './ViewProducts.module.css';

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
import {getAllProducts} from '../../../containers/product/actions'
import {withRouter} from 'react-router-dom'


const ViewProducts = (props) => { 
    const [products,setProducts] = React.useState(props.products);
    const [showEntries,setShowEntries] = React.useState(10)


    React.useEffect(() => {
        if(!props.products) {
            props.getAllProducts();
        }
        setProducts(props.products);
    },[props.products]);

    let isLoading = !products;
    let showData = !isLoading;
    let rowData = [];

    !isLoading && products.forEach((product,index) => {
        if(index+1 <= showEntries || showEntries == "All") {
            rowData.push([
                index + 1,
                product.productName,
                product.productPrice,
                product.categoryId && product.categoryId.categoryName,
                <Switch
                    checked={product.active}
                    onChange={() => {}} 
                    color="primary"
                />,
                <React.Fragment>
                    <Tooltip title="Edit Product">
                        <IconButton>
                            <EditRoundedIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Product">
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
                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />} onClick={() => props.history.push("/admin/product/ADD-PRODUCT")}>Add Product</Button>

                    <Button color="primary" variant="contained" endIcon={<FilterListRoundedIcon />}>Filter</Button>
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
            <TableComp 
                columns={["Sl No","Product Name","Price","Category","Active","Action"]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    products: state.product.products
})
export default withRouter(connect(mapStateToProps,{getAllProducts})(ViewProducts));