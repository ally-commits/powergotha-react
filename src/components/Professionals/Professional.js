import React from 'react'
import { MDBDataTable } from 'mdbreact';
import TopBar from '../TopBar/TopBar';
import styles from './Professional.module.css'
import Card from 'react-bootstrap/Card'
import AppLoader from '../utils/AppLoader/AppLoader';
import {connect} from 'react-redux';
import {getUserList} from '../../containers/app/actions'

const Professional = (props) => {
    const [data,setData] = React.useState(props.users.professionalUsers);

    React.useEffect(() => {
        if(!props.users) {
            props.getUserList()
        } else {
            let arr = props.users.professionalUsers.map(val => {
                return {
                    ...val,
                    unlocked: val.unlockedProfessionalUser.length
                }
            })
            setData([...arr])
        }
    },[props.users])


    let columnData = [
        {
            label: 'Name',
            field: 'fullName',
            width: 150,
            attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
            },
        },
        {
            label: 'Email',
            field: 'emailId',
            width: 270,
        },
        {
            label: 'Gender',
            field: 'gender',
            width: 200,
        },
        {
            label: 'Phone Number',
            field: 'contactNum',
            sort: 'asc',
            width: 100,
        },
        {
            label: 'Dob',
            field: 'dob', 
            width: 150,
        },
        {
            label: 'Address',
            field: 'address', 
            width: 100,
        },
        {
            label: 'Unlocked',
            field: 'unlocked', 
            width: 100,
        },
    ];
    return (
        <React.Fragment>
            <TopBar head="Professionals" />
            <Card className={styles.container}>
                {data
                    ?
                <MDBDataTable
                    striped
                    bordered
                    hover
                    entries={10}
                    data={{
                        columns: columnData,
                        rows: data
                    }}
                />
                    :
                <AppLoader />}
            </Card>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    users: state.app.users
})
export default connect(mapStateToProps,{getUserList})(Professional);