import React from 'react';
import BreadCrump from '../../components/BreadCrump/BreadCrump'; 
import AddCategory from '../../components/Category/AddCategory/AddCategory';
import EditCategory from '../../components/Category/EditCategory/EditCategory';
import ViewCategory from '../../components/Category/ViewCategory/ViewCategory';
import TopBar from '../../components/TopBar/TopBar';
import LANG from '../../translator';
import styles from './Category.module.css';


const Category = (props) => {
    const [state,setState] = React.useState("VIEW-CATEGORY");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-CATEGORY": {
            name: "View Animal Category",
            path: "/admin/category/VIEW-CATEGORY"
        },
        "ADD-CATEGORY": {
            name: "Add Animal Category",
            path: "/admin/category/ADD-CATEGORY"
        },
        "EDIT-CATEGORY": {
            name: "Edit Animal Category",
            path: "/admin/category/EDIT-CATEGORY"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head={LANG.ANIMAL_CATEGORY} />
            <BreadCrump 
                navItems={[{name:"Animal Category",path: "/admin/category/VIEW-CATEGORY"},navData[state]]}
            />

            {state == "VIEW-CATEGORY" && <ViewCategory />}
            {state == "ADD-CATEGORY" && <AddCategory />}
            {state == "EDIT-CATEGORY" && <EditCategory />}
        </div>
    )
}

export default Category;