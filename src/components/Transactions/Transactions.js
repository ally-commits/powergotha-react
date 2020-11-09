import React from 'react'
import { MDBDataTable } from 'mdbreact';
import TopBar from '../TopBar/TopBar';
import styles from './Transactions.module.css'
import Card from 'react-bootstrap/Card'
import {columnData,rowData} from '../../tableData'
import axios from 'axios'
import {showAlert} from '../../containers/app/actions'
import {connect} from 'react-redux'
import AppLoader from '../utils/AppLoader/AppLoader';

const Transactions = (props) => {
    const [data,setData] = React.useState(false);

    React.useEffect(() => {
        axios({
            method: "post",
            url: "/getAllTransactions" 
        }).then(res => {
            setData(res.data.transactions)
        }).catch(err => {
            props.showAlert("Something went wrong Try again");
        })
    },[]);

    let columnData = [
        {
            label: 'Title',
            field: 'title',
            width: 150,
            attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
            },
        },
        {
            label: 'Transaction Amount',
            field: 'transactionAmount',
            width: 270,
        },
        {
            label: 'Transaction Date',
            field: 'transactionDate',
            width: 200,
        },
        {
            label: 'Transaction Time',
            field: 'transactionTime',
            sort: 'asc',
            width: 100,
        },
        {
            label: 'Transaction Type',
            field: 'transactionType', 
            width: 150,
        },
        {
            label: 'Date',
            field: 'transactionDate', 
            width: 100,
        },
    ];
    return (
        <React.Fragment>
            <TopBar head="Transactions" />
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

export default connect(null,{showAlert})(Transactions);