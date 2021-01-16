import { Avatar, Button } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './Chat.css'
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'

function Chat() {
    const [input,setInput]=useState('');
    const [{user},dispatch]=useStateValue();
    
    const [roomName,setRoomName]=useState('');
    const [messages,setMessages]=useState([]);
    const {roomId}=useParams();
    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            name:user.displayName,
            message:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('');
    };
    useEffect(()=>{
         db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
             setRoomName(snapshot.data().name)
         });
         db.collection('rooms').doc(roomId).collection('messages')
         .orderBy('timestamp','asc').onSnapshot(snapshot=>{
             setMessages(snapshot.docs.map(doc=>doc.data()))
         })
    },[roomId])
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {' '}{ messages[0] && new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__header_Right">
                    <Button><AttachFile/></Button>
                    <Button><MoreVert/></Button>
                    <Button><SearchOutlined/></Button>
                    
                </div>

            </div>
            <div className="chat__body">
                {messages.map(message=>(
                 <p className={`chat__message ${user.displayName==message.name && 'chat__reciever'}`}>
                 <span className="chat__name">{message.name}</span>{message.message}
                 <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                 </p>
                ))}
                
                

            </div>
            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                   <input value={input} onChange={e=>setInput(e.target.value)} placeholder="type a message" type="text" />
                   <button onClick={sendMessage}>Send a message</button>
                </form>
                 <Mic/>

            </div>
        </div>
    )
}

export default Chat
