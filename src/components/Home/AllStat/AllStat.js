import React from 'react'
import styles from './AllStat.module.css'
import Paper from '@material-ui/core/Paper'
import Graph from './Graph/Graph'

const AllStat = (props) => {
    return (
        <Paper variant="outlined" className={styles.container}>
            <div className={styles.container}>
                <Graph data={props.data.users} head="Users" style={styles.users}  />
                <Graph data={props.data.orders} head="Orders" style={styles.orders}  />
                <Graph data={props.data.ordersDelv} head="Orders Delivered" style={styles.ordersDelv} />
            </div>
        </Paper>
    )
}

export default AllStat;