import { Avatar } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import './SidebarChat.css'
import db from './firebase'
import { Link } from 'react-router-dom'
function SidebarChat({addNewChat,id,name}) {
    const createChat=()=>{
        const roomName=prompt("Type the chat name?");
        if(roomName){
            //we do some databas stuff here s
            db.collection('rooms').add({name:roomName});
        }
    }
    const [messages,setMessages]=useState([])
   
        useEffect(()=>{
          db.collection('rooms').doc(id).
          collection('messages').orderBy('timestamp','desc')
          .onSnapshot(snapshot=>
            setMessages(snapshot.docs.map((doc)=>doc.data())))
        },[id])
  
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat
