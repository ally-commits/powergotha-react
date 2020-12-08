import React from 'react';
import styles from './Chat.module.css';
 
import TopBar from '../../components/TopBar/TopBar';
 
import LANG from '../../translator';
import ChatComp from '../../components/Chat/ChatComp';


const Chat = (props) => {  
    return (
        <div className={styles.container}>
            <TopBar head={LANG.REPLIES} />
             
            <ChatComp />
        </div>
    )
}

export default Chat;