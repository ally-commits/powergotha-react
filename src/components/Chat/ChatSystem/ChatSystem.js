import React from 'react'
import firebase from 'firebase'
import styles from './ChatSystem.module.css'
import ScrollableFeed from 'react-scrollable-feed'
import moment from 'moment';


const ChatSystem = (props) => {
    const [value,setValue] = React.useState("")
    const [msg,setMsg] = React.useState([]) 

    React.useEffect(() => {
        firebase.database().ref(props.userId).once('value').then((snapshot) => {
            let arr = Object.keys(snapshot.val()).map(val => snapshot.val()[val]);
            setMsg(arr);
        }) 
    },[props.userId]);
    const scroll = React.useRef(null)

    React.useEffect(() => { 
        if(scroll) {
            console.log(scroll.current)
            // scroll.current.scrollIntoView({ behavior: 'smooth' })
        }
    },[]);

    React.useEffect(() => {
        var messages = firebase.database().ref(props.userId);
        messages.on('child_added', (data) => {
            let arr = msg;
            arr.push(data.val())
            setMsg([...arr]); 
        });
    },[props.userId]);

    const checkIfSubmit = (e) => {
        if (e.keyCode === 13) {
            onSubmit();
        }
    }
    const onSubmit = () => {
        if(value == "") {
            console.log("Enter something")
        } else {
            var chat = firebase.database().ref(props.userId);
            var newChat = chat.push();
            newChat.set({
                type: "ADMIN",
                msg: value,
                timeStamp: Date.now()
            });

            setValue("")
        }
    } 
    return (
        <React.Fragment>
            {props.activeUserId == props.userId
                ?
            <div className={styles.container}> 
                <div className={styles.header}>
                    <p>{props.name}</p>
                </div>

                <div className={styles.content}>
                    <ScrollableFeed>
                    
                        {msg.map(val => {
                            console.log(val)
                            return (
                                <p className={val.type == "ADMIN" ? styles.rightContent : styles.leftContent}>{val.msg}<div className={styles.dateTime}>{ moment.unix(val.timeStamp).format("DD,MMM HH:mm")}</div></p>
                            )
                        })}
                    </ScrollableFeed>
                </div>

                <div className={styles.footer}>
                    <input 
                        type="text" 
                        value={value} 
                        onBlur={e => setValue(e.target.value.trim())}
                        onChange={e => setValue(e.target.value)} 
                        placeholder="Type Something" 
                        onKeyDown={checkIfSubmit}
                    />
                    <button onClick={onSubmit}>Send</button>
                </div>
            </div>
                :
            <React.Fragment></React.Fragment>}
        </React.Fragment>
    )
}

export default ChatSystem;