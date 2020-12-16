import React from 'react';
import styles from './Content.module.css'

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress'

import StarRoundedIcon from '@material-ui/icons/StarRounded';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';

import {connect} from 'react-redux'
import {showAlert} from '../../../containers/app/actions'
import axios from 'axios'
import LANG from '../../../translator';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: "20px 0px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const Content = (props) => {
    const classes = useStyles();
    const [reply,setReply] = React.useState("")
    const [replies,setReplies] = React.useState(props.feedback.reply);
    const [loading,setLoading] = React.useState(false);
    const [error,setError] = React.useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if(reply) {
            setError(false);
            setLoading(true);
            let data = replies;
            data.push(reply);

            axios({
                method: "put",
                url: "/feedback/reply",
                data: {
                    reply: data,
                    addedBy: props.feedback.addedBy._id,
                    feedbackId: props.feedback._id
                }
            }).then(res => {
                setLoading(false);
                setReplies([...data])
                setReply("")
                props.showAlert("Feedback Updated Succesfully");
            }).catch(err => {
                setLoading(false);
                if(err && err.response && err.response.data && err.response.data.error) {
                    props.showAlert(err.response.data.error)
                } else {
                    props.showAlert("Something went wrong ! Try Again")
                }
                console.log(err)
            })

        } else {
            setError("Field cannot be empty")
        }
    }
    const feedback = props.feedback;
    return (
        <div className={classes.root}>
        <Accordion>
            <AccordionSummary 
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <div className={styles.content}>
                    <img src={feedback.addedBy.profilePicture} alt=""/>

                    <div className={styles.infoContent}>
                        <div className={styles.header}>
                            <h1>{feedback.addedBy.name}</h1>    

                            <div className={styles.rating}>
                                {Array(parseInt(feedback.rating)).fill("").map(val => {
                                    return <StarRoundedIcon style={{color: "FFD700"}} />
                                })}
                            </div>
                        </div>   

                        <div className={styles.feedbackContent}>
                            <p>{feedback.feedback}</p>
                        </div>

                        <div className={styles.footer}>
                            <Button variant="contained" color="primary" endIcon={<ReplyRoundedIcon />}>{LANG.REPLY}</Button>
                        </div> 
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails> 
                <div className={styles.textFeild}>
                    <div className={styles.container}>
                        {replies.map(val => {
                            return (
                                <div className={styles.replyContent}>
                                    <p>{val}</p>
                                </div>
                            )
                        })}
                    </div>

                    <form onSubmit={onSubmit}>
                        <TextField
                            value={reply}
                            onChange={e => setReply(e.target.value)}
                            label={LANG.REPLY} 
                            rows={4}
                            fullWidth  
                            error={error}
                            helperText={error}
                        />

                        <div className={styles.row}>
                            {loading
                                ?
                            <Button color="primary" variant="contained" startIcon={<CircularProgress color="inherit" size={20} />}>{LANG.LOADING}</Button>
                                :
                            <Button color="primary" variant="contained" startIcon={<UpdateRoundedIcon />}>{LANG.ADD + " " + LANG.REPLY}</Button>}
                        </div>
                    </form>
                </div>
            </AccordionDetails>
        </Accordion>
        </div>
    );
}

export default connect(null,{showAlert})(Content);


