import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import './Login.css'
import { useStateValue } from './StateProvider';

function Login() {
    const [state,dispatch]=useStateValue();
    const signIn=(e)=>{
        //do some login stuff here
        auth.signInWithPopup(provider).then(result=>{
            dispatch({
                type:'SET_USER',
                user:result.user
            })
            
        }).catch(error=>console.log(error))
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png" alt="logo"/>
                <div className="login__text">
                    <h2>Sign in to whatsapp</h2>
                </div>
                <Button onClick={signIn}>Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login
