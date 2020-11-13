import React from 'react';
import Popper from '@material-ui/core/Popper'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'

import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Typography from '@material-ui/core/Typography'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 800, 
      backgroundColor: theme.palette.background.paper,
    },
    content: {
        marginLeft: 20,
        marginTop: 20
    }
}));
const DropDown = (props) => {
    const classes = useStyles(); 
    return (
        <Popper open={props.open} anchorEl={props.anchorRef.current} role={undefined} transition disablePortal className={classes.content}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={() => {}}>
                    <div className={classes.root}>
                        <List component="nav" >
                            {props.options.map(val => {
                                return (
                                    <ListItem button> 
                                        {props.icon} 
                                        <ListItemText primary={val}  />
                                    </ListItem>    
                                )
                            })}
                        </List>
                    </div>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    )
}

export default DropDown;

