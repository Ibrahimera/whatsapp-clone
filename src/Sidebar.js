
import React,{useState,useEffect} from 'react'
import { Avatar,Button } from '@material-ui/core'
import  MoreVertIcon from '@material-ui/icons/MoreVert'
import ChatIcon from '@material-ui/icons/Chat'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import './Sidebar.css'
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import db from './firebase'
import { useStateValue } from './StateProvider'

function Sidebar() {
    const [rooms,setRoom]=useState([]);
    const [{user},dispatch]=useStateValue();
    
    useEffect(() => {
       let unsubscribe= db.collection('rooms').onSnapshot(snapshot=>{
            setRoom(snapshot.docs.map(doc=>({id:doc.id,data:doc.data()})))
        });
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
              <Avatar src={user.photoURL}/>
              <div className="sidebar__headerRight">
                  <Button><DonutLargeIcon/></Button>
                  <Button><ChatIcon /></Button>
                  <Button><MoreVertIcon /></Button>
              </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                <SearchOutlined />
               <input placeholder="search or start new chat" type="text" />
                </div>
               
            </div>
            <div className="sidebar__chats">
             <SidebarChat addNewChat/>
             {rooms.map(room=>(<SidebarChat key={room.id} id={room.id} name={room.data.name} />)
                 
             )}
              
            </div>
        </div>
    )
}

export default Sidebar
