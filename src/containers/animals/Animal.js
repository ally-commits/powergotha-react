import React from 'react';
import BreadCrump from '../../components/BreadCrump/BreadCrump'; 

import AddAnimal from '../../components/Animal/AddAnimal/AddAnimal';
import EditAnimal from '../../components/Animal/EditAnimal/EditAnimal';
import ViewAnimal from '../../components/Animal/ViewAnimal/ViewAnimal';
import ViewUserDetails from '../../components/Animal/ViewUserDetails/ViewUserDetails';

import TopBar from '../../components/TopBar/TopBar';
import styles from './Animal.module.css';


const Animal = (props) => {
    const [state,setState] = React.useState("VIEW-DETAILS");   

    React.useEffect(() => {
        if(Object.keys(navData).includes(props.match.params.type)) {
            setState(props.match.params.type)
        }
    },[props.match.params.type]);

    const navData = {
        "VIEW-DETAILS": {
            name: "View Details",
            path: "/admin/animals/VIEW-DETAILS"
        },
        "VIEW-USER-DETAILS": {
            name: "View User Details",
            path: "/admin/animals/VIEW-USER-DETAILS"
        },
        "ADD-ANIMAL": {
            name: "Add Animal",
            path: "/admin/animals/ADD-ANIMAL"
        },
        "EDIT-ANIMAL": {
            name: "Edit Animal",
            path: "/admin/animals/EDIT-ANIMAL"
        },
    }
    return (
        <div className={styles.container}>
            <TopBar head="Animal" />
            <BreadCrump 
                navItems={[{name:"User List",path: "/admin/animals/VIEW-DETAILS"},navData[state]]}
            />

            {state == "VIEW-DETAILS" && <ViewAnimal />}
            {state == "VIEW-USER-DETAILS" && <ViewUserDetails />}
            {state == "ADD-ANIMAL" && <AddAnimal />}
            {state == "EDIT-ANIMAL" && <EditAnimal />} 
        </div>
    )
}

export default Animal;