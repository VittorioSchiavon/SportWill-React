import React from 'react'
import styles from  './Header.module.css'
import logo from  "../assets/Images/logo.png"
import { Route, Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className={styles.topnav}>
            <Route render={({history}) => (
            <img src={logo} alt="logo" className={styles.logo} onClick={() => { history.push('/Home') }}/>)} />  

            <div className={styles.container}>
                <Link to="/Home" className={styles.link}>Home</Link>
                <Link to="/Login" className={styles.link}>Login</Link>
                <Link to="/Logout" className={styles.link}>Logout</Link>
            </div>
        </div>
    )
}
