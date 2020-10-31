import React from 'react'
import { MDBDataTable } from 'mdbreact';
import TopBar from '../TopBar/TopBar';
import styles from './Professional.module.css'
import Card from 'react-bootstrap/Card'
import {columnData,rowData} from '../../tableData'

const Professional = () => {
    let datatable = {
        columns: columnData,
        rows: rowData
    } 
    return (
        <React.Fragment>
            <TopBar head="Professionals" />
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

export default Professional;