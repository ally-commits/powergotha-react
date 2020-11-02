import React from 'react'
import { MDBDataTable } from 'mdbreact';
import TopBar from '../TopBar/TopBar';
import styles from './Transactions.module.css'
import Card from 'react-bootstrap/Card'
import {columnData,rowData} from '../../tableData'

const Transactions = () => {
    let datatable = {
        columns: columnData,
        rows: rowData
    } 
    return (
        <React.Fragment>
            <TopBar head="Transactions" />
            <Card className={styles.container}>
                <MDBDataTable
                    striped
                    bordered
                    hover
                    entries={10}
                    data={datatable}
                />
            </Card>
        </React.Fragment>
    )
}

export default Transactions;