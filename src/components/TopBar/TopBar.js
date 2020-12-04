import React from 'react';
import styles from './TopBar.module.css' 
import profielImg from '../../assets/img/profile.png'
import Profile from './Profile/Profile'

import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'; 
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'; 
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper'; 
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { makeStyles } from '@material-ui/core/styles';
import LANG from '../../translator';


const useStyles = makeStyles((theme) => ({
    poper: { 
      top: '10px !important',
      zIndex: '100'
    }, 
    item: {
      fontSize: '14px',
      padding: '12px 20px',
      '& p' : {
        margin: 0,
        marginLeft: '10px'
      }
    }
}));

const TopBar = (props) => {
    const classes = useStyles();
    const [modal,setModal] = React.useState(false) 

    const [anchorEl, setAnchorEl] = React.useState(null); 
    const [loading,setLoading] = React.useState(false);
    
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);

    const logout = () => {
        localStorage.clear();
        window.location.replace("/login")
    }
    let lang = "English";
    if(localStorage.lang && localStorage.getItem("lang") == "English") {
        lang = "मराठी"
    }
    return (
        <React.Fragment>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <h2>{props.head}</h2>

                        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                            <div className={styles.profile} onClick={handlePopoverOpen} >
                                <img src={profielImg} alt="Profile Image"/>
                                <p>{LANG.PROFILE}</p>
                                <ArrowDropDownRoundedIcon />
                            </div>
                        </ClickAwayListener>

                        <Popper open={open} anchorEl={anchorEl} placement={"bottom-end"} transition className={classes.poper}>
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                    <List>

                                        <ListItem button className={classes.item} onClick={() => setModal(true)}>
                                            <PersonRoundedIcon style={{fontSize: '20px',color: 'var(--text-color)'}} />  
                                            <p>{LANG.MY_ACCOUNT}</p>
                                        </ListItem> 

                                        <ListItem button className={classes.item} onClick={() => {
                                            localStorage.setItem("lang",lang)
                                            window.location.reload();
                                        }}>
                                            <LanguageRoundedIcon style={{fontSize: '20px',color: 'var(--text-color)'}} />  
                                            <p>{lang}</p>
                                        </ListItem> 

                                        <ListItem button className={classes.item} onClick={logout}>
                                            {loading
                                            ? 
                                            <React.Fragment></React.Fragment>
                                            :
                                            <ExitToAppRoundedIcon style={{fontSize: '20px',color: 'var(--text-color)'}} />  }
                                            <p>{LANG.LOGOUT}</p>
                                        </ListItem>

                                    </List>
                                </Paper>
                                </Fade>
                            )}
                        </Popper>
                    </div>
                </div>

            <div className={styles.spacer}>&nbsp;</div>
            
            <Profile open={modal} onClose={() => setModal(false)}/>
        </React.Fragment>
    )
}

export default TopBar;