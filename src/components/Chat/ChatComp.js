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
    const [searchVal,setSearchVal] = React.useState("");

    React.useEffect(() => {
        firebase.database().ref("/").once('value').then((snapshot) => {
            let chatList = Object.keys(snapshot.val())
            setChats(chatList)
            if(chatList.length > 0) {
                setActiveUserId(chatList[0])
            }
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

                <div className={styles.searchBar}>
                    <input type="text" placeholder="Search Here.." value={searchVal} onChange={e => setSearchVal(e.target.value)} />
                </div>
                {chats.map(userId => {
                    if(users[userId] && users[userId].name.toLowerCase().includes(searchVal.toLowerCase())) {
                        return (
                            <div 
                                onClick={() => setActiveUserId(userId)}
                                className={activeUserId == userId ? styles.activeListItem : styles.listItem}
                            >{users[userId] && users[userId].name}
                            </div>
                        )
                    } else return;
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