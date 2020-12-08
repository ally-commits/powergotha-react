import React from 'react'
import styles from './ChatComp.module.css'
import firebase from 'firebase'

import ChatSystem from './ChatSystem/ChatSystem'

import Paper from '@material-ui/core/Paper'

import {connect} from 'react-redux'
import {getAllUsers} from '../../containers/enduser/actions'
import LANG from '../../translator'

const ChatComp = (props) => {    
    const [chats,setChats] = React.useState([]);
    const [users,setUsers] = React.useState({});
    const [activeUserId,setActiveUserId] = React.useState(false);

    React.useEffect(() => {
        firebase.database().ref("/").once('value').then((snapshot) => {
            setChats(Object.keys(snapshot.val()))
        })
    },[]);

    React.useEffect(() => {
        if(props.userData) { 
            let arr = {};
            props.userData.users.forEach(val => {
                arr[val._id] = val
            }) 
            setUsers(arr)
        } else {
            props.getAllUsers();
        }
    },[props.userData]);

    return (
        <Paper className={styles.container} variant="outlined"> 
            <div className={styles.leftContent}>
                <h1>{LANG.REPLIES}</h1>
                {chats.map(userId => {
                    return (
                        <div 
                            onClick={() => setActiveUserId(userId)}
                            className={activeUserId == userId ? styles.activeListItem : styles.listItem}
                        >{users[userId] && users[userId].name}
                        </div>
                    )
                })}
            </div>
            <div className={styles.rightContent}> 
                {chats.map(userId => {
                    return (
                        <ChatSystem userId={userId} name={users[userId] && users[userId].name} activeUserId={activeUserId} />
                    )
                })} 
            </div> 
        </Paper>
    )
}

const mapStateToProps = state => ({
    userData: state.user.userData
})
export default connect(mapStateToProps,{getAllUsers})(ChatComp);