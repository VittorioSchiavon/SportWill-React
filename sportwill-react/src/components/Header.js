import React from 'react'
import styles from  './Header.module.css'
import logo from  "../assets/Images/logo.png"
import { Route, Link } from 'react-router-dom'
import * as Auth from "../services/Auth"
import { useState } from 'react'
import Message from './Message'

export default function Header() {
const [message, setMessage]=useState("");


    return (
        <div className={styles.topnav}>
            <Route render={({history}) => (
            <img src={logo} alt="logo" className={styles.logo} onClick={() => { history.push('/Home') }}/>)} />  

            <div className={styles.container}>
                <Link to="/Home" className={styles.link}>Home</Link>
                {!Auth.isAuthenticated()
                ?<Link to="/SignIn" className={styles.link}>Login</Link>
                :<div className={styles.link} onClick={()=>{Auth.logout();
                    setMessage("Operation Successfully Completed!")}}>Logout</div>
                }
            </div>
            {message!=="" && <Message message={message} okFunction={()=>{setMessage("")}}/>}
        </div>
    )
}
