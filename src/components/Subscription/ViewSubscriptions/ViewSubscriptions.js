import React from 'react'
import styles from './ViewSubscriptions.module.css';

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'  
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
 
import AddRoundedIcon from '@material-ui/icons/AddRounded';  
 
import AppLoader from '../../utils/AppLoader/AppLoader';

import {connect} from 'react-redux'
import {getAllSubscriptions} from '../../../containers/subscription/actions'
import {withRouter} from 'react-router-dom' 
import LANG from '../../../translator';

const ViewSubscriptions = (props) => { 
    const [subscriptions,setSubscriptions] = React.useState(props.subscriptions);
    const [showEntries,setShowEntries] = React.useState(10)
    const [searchVal,setSearchVal] = React.useState("");

    React.useEffect(() => {
        if(!props.subscriptions) {
            props.getAllSubscriptions();
        }
        setSubscriptions(props.subscriptions);
    },[props.subscriptions]);

    let isLoading = !subscriptions;
    let showData = !isLoading;


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.leftHeader}>
                    <p>{LANG.SHOWENTRIES}</p>
                    <Select value={showEntries} onChange={e => setShowEntries(e.target.value)}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={30}>50</MenuItem>
                        <MenuItem value={LANG.ALL}>{LANG.ALL}</MenuItem>
                    </Select>
                </div>

                <div className={styles.rightHeader}>
                    <TextField
                        label={LANG.SEARCH_HERE}
                        className={styles.search}
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                    />

                    <Button color="primary" variant="contained" endIcon={<AddRoundedIcon />} onClick={() => props.history.push("/admin/subscription/ADD-SUBSCRIPTION")}>{LANG.ADD} {LANG.SUBSCRIPTION}</Button>
                </div>
            </div>

            {isLoading && <AppLoader />}

            {showData &&
                <div className={styles.cards}>
                    {!isLoading && subscriptions.map((sub,index) => {
                        if(index+1 <= showEntries || showEntries == LANG.ALL) {
                            if(sub.name.toLowerCase().includes(searchVal.toLowerCase()) || sub.price.toString().toLowerCase().includes(searchVal.toLowerCase())) {
                                return ( 
                                    <Paper className={styles.card} variant="outlined">                      
                                        <div className={styles.cardHeader}>
                                            <p>{sub.name}</p>
                                            <p>₹ {sub.price}</p>
                                        </div>

                                        <div className={styles.points}>
                                            {sub.points.map(val => {
                                                return (
                                                    <div className={styles.point}>
                                                        <span>&nbsp;</span>
                                                        <p>{val}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <Button variant="contained" color="primary"
                                                onClick={() => props.history.push("/admin/subscription/EDIT-SUBSCRIPTION?subscriptionId=" + sub._id)}
                                            >{LANG.EDIT} {LANG.SUBSCRIPTION} </Button>
                                        </div>
                                    </Paper>
                                );
                            } else return;
                        } else return;
                    })}
                </div>
            }

        </div>
    )
}
const mapStateToProps = state => ({
    subscriptions: state.subscription.subscriptions
})
export default withRouter(connect(mapStateToProps,{getAllSubscriptions})(ViewSubscriptions));