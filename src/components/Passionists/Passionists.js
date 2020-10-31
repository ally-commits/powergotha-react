import React from 'react'
import { MDBDataTable } from 'mdbreact';
import TopBar from '../TopBar/TopBar';
import styles from './Passionists.module.css'
import Card from 'react-bootstrap/Card'
import {columnData,rowData} from '../../tableData'

const Passionists = () => {
    let datatable = {
        columns: columnData,
        rows: rowData
    } 
    return (
        <React.Fragment>
            <TopBar head="Passionists" />
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

export default Passionists;