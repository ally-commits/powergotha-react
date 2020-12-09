import React from 'react';
import BreadCrump from '../../components/BreadCrump/BreadCrump'; 

import AddAnimal from '../../components/Animal/AddAnimal/AddAnimal';
import EditAnimal from '../../components/Animal/EditAnimal/EditAnimal';
import ViewAnimal from '../../components/Animal/ViewAnimal/ViewAnimal';
import ViewUserDetails from '../../components/Animal/ViewUserDetails/ViewUserDetails';

import TopBar from '../../components/TopBar/TopBar';
import styles from './Animal.module.css';
import LANG from '../../translator';
import {useLocation} from 'react-router-dom'

const Animal = (props) => {
    let { search } = useLocation();
    const query = new URLSearchParams(search);

    const [state,setState] = React.useState("VIEW-DETAILS");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-DETAILS": {
            name: LANG.FARMER_LIST,
            path: "/admin/animals/VIEW-DETAILS"
        },
        "VIEW-USER-DETAILS": {
            name: LANG.FARMER_DETAILS,
            path: "/admin/animals/VIEW-USER-DETAILS?userId=" + query.get("userId")
        },
        "ADD-ANIMAL": {
            name: LANG.ADD + " " + LANG.ANIMAL,
            path: "/admin/animals/ADD-ANIMAL"
        },
        "EDIT-ANIMAL": {
            name: LANG.EDIT + " " + LANG.ANIMAL,
            path: "/admin/animals/EDIT-ANIMAL"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head={LANG.ANIMAL} />
            <BreadCrump 
                navItems={[
                    {name:LANG.ANIMAL,path: "/admin/animals/VIEW-DETAILS"},
                    state == "ADD-ANIMAL" || state == "EDIT-ANIMAL" ? navData["VIEW-USER-DETAILS"] : false,
                    navData[state]
                ]}
            />

            {state == "VIEW-DETAILS" && <ViewAnimal />}
            {state == "VIEW-USER-DETAILS" && <ViewUserDetails />}
            {state == "ADD-ANIMAL" && <AddAnimal />}
            {state == "EDIT-ANIMAL" && <EditAnimal />} 
        </div>
    )
}

export default Animal;