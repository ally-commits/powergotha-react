import React from 'react'
import firebase from 'firebase'
import styles from './ChatSystem.module.css'

const ChatSystem = (props) => {
    const [value,setValue] = React.useState("")
    const [msg,setMsg] = React.useState([]) 

    React.useEffect(() => {
        firebase.database().ref(props.userId).once('value').then((snapshot) => {
            let arr = Object.keys(snapshot.val()).map(val => snapshot.val()[val]);
            setMsg(arr);
        }) 
    },[props.userId]);

    React.useEffect(() => {
        var messages = firebase.database().ref(props.userId);
        messages.on('child_added', (data) => {
            let arr = msg;
            arr.push(data.val())
            setMsg([...arr]);

            console.log(data.val())
        });
    },[props.userId]);


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
                    <div class={styles.fix}></div>
                    {msg.map(val => {
                        return (
                            <p className={val.type == "ADMIN" ? styles.rightContent : styles.leftContent}>{val.msg}</p>
                        )
                    })}
                </div>  

                <div className={styles.footer}>
                    <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Type Something" />
                    <button onClick={onSubmit}>Send</button>
                </div>
            </div>
                :
            <React.Fragment></React.Fragment>}
        </React.Fragment>
    )
}

export default ChatSystem;