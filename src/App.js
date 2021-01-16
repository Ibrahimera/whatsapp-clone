import React,{useState} from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {  BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Login from './Login';
import { useStateValue } from './StateProvider';


function App() {
  const [{user},dispatch]=useStateValue();

 
  return (
    <Router>
    <div className="app">
      {!user ?(<Login />):(
        <div className="app__body">
        <Sidebar />
        <Switch>
          <Route path="/rooms/:roomId"><Chat /></Route>
        </Switch>
      </div>
      )}
      
      
    </div>
    </Router>
    
  );
}

export default App;
