import React from 'react'
import styles from './ViewProducts.module.css';

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button' 
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import TextField from '@material-ui/core/TextField'

import TableComp from '../../utils/Table/Table';
import AppLoader from '../../utils/AppLoader/AppLoader';

import {connect} from 'react-redux'
import {getAllProducts,onProductDelete} from '../../../containers/product/actions'
import {withRouter} from 'react-router-dom'
import ConfirmAlert from '../../utils/ConfirmAlert/ConfirmAlert';


const ViewProducts = (props) => { 
    const [products,setProducts] = React.useState(props.products);
    const [showEntries,setShowEntries] = React.useState(10)
    const [searchVal,setSearchVal] = React.useState("");

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
            if(product.productName.toLowerCase().includes(searchVal.toLowerCase()) || product.productPrice.toString().toLowerCase().includes(searchVal.toLowerCase())
                || product.categoryId.categoryName.toLowerCase().includes(searchVal.toLowerCase()) || product.warehouseId.warehouseName.toLowerCase().includes(searchVal.toLowerCase())
                || product.addedBy.name.toLowerCase().includes(searchVal.toLowerCase())
            ){
                rowData.push([
                    index + 1,
                    product.productName,
                    product.productPrice,
                    product.categoryId && product.categoryId.categoryName,
                    
                    product.active
                        ?
                    <CheckCircleOutlineRoundedIcon style={{color: "green"}} />
                        :
                    <HighlightOffRoundedIcon style={{color: "red"}}/>,

                    product.addedBy ? <p className={styles.addedBy}>{product.addedBy.userType} - {product.addedBy.name}</p> : "---",

                    product.stockLeft,
                    product.warehouseId.warehouseName,

                    <React.Fragment>
                        <Tooltip title="Edit Product">
                            <IconButton onClick={() => props.history.push("/admin/product/EDIT-PRODUCT?productId="+ product._id )}>
                                <EditRoundedIcon />
                            </IconButton>
                        </Tooltip>

                        <ConfirmAlert msg={`Are you sure you want delete ${product.productName}`} onClickEvent={() => props.onProductDelete(product._id)}>
                            <Tooltip title="Delete Product">
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
                        label="Search Here"
                        className={styles.search}
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                    />
                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />} onClick={() => props.history.push("/admin/product/ADD-PRODUCT")}>Add Product</Button>
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
            <TableComp 
                columns={["Sl No","Product Name","Price","Category","Active","Added By","Stock Left","Warehouse Name","Action"]}
                rows={rowData}
            />}

        </div>
    )
}
const mapStateToProps = state => ({
    products: state.product.products
})
export default withRouter(connect(mapStateToProps,{getAllProducts,onProductDelete})(ViewProducts));