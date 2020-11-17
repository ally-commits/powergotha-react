import React from 'react';
import BreadCrump from '../../components/BreadCrump/BreadCrump';
import AddProduct from '../../components/Products/AddProduct/AddProduct';
import ViewProducts from '../../components/Products/ViewProducts/ViewProducts';
import TopBar from '../../components/TopBar/TopBar';
import styles from './Product.module.css';


const Product = (props) => {
    const [state,setState] = React.useState("VIEW-PRODUCTS");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-PRODUCTS": {
            name: "View Products",
            path: "/admin/product/VIEW-PRODUCTS"
        },
        "ADD-PRODUCT": {
            name: "Add Product",
            path: "/admin/product/ADD-PRODUCT"
        },
        "EDIT-PRODUCT": {
            name: "EDIT Product",
            path: "/admin/product/EDIT-PRODUCT"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head="Product" />
            <BreadCrump 
                navItems={[{name:"Product",path: "/admin/product/VIEW-PRODUCTS"},navData[state]]}
            />

            {state == "VIEW-PRODUCTS" && <ViewProducts />}
            {state == "ADD-PRODUCT" && <AddProduct />}
        </div>
    )
}

export default Product;