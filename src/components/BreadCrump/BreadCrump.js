import React from 'react';
import styles from './BreadCrump.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  link: {
    textDecoration: "none",
    fontSize: "15px",
    margin: 0,
    color: "#606060",
    lineHeight: "1px",
    '&:hover': {
        textDecoration: "none",
        cursor: "pointer"
    }
  },
  text: {
      fontSize: '15px'
  }
}));
const BreadCrump = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.content}>
                    <Breadcrumbs separator={<KeyboardArrowRightRoundedIcon fontSize="small" />} aria-label="breadcrumb">
                        {props.navItems.map((nav,index) => {
                            if(nav) {
                                if(index+1 != props.navItems.length) {
                                    return (
                                        <Typography color="inherit" className={classes.link} onClick={() => props.history.push(nav.path)}>
                                            {nav.name}
                                        </Typography>
                                    )
                                } else {
                                    return (
                                        <Typography color="textPrimary" className={classes.text}>{nav.name}</Typography>
                                    )
                                } 
                            } else return;
                        })} 
                    </Breadcrumbs>
                </div>
            </div>
            <div className={styles.spacer}>&nbsp;</div>
        </React.Fragment>
    )
}

export default withRouter(BreadCrump);