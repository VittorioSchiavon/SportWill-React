import React from 'react'
import { Route } from 'react-router'
import styles from "./WillCard.module.css"
import * as Auth from "../services/Auth";

export default function WillCard(props) {
var icon= './assets/SportImages/Icons/'+props.will.sport+".svg"
    return (

        <Route render={({history}) => (
            
            <div id={styles.willCard} onClick={() => { props.will.proprietario=== Auth.getUserEmail()?
                history.push(`/Edit/${props.will.id}`)
                :history.push(`/Detail/${props.will.id}`) }}>
            <div id={styles.nameContainer}>
                <img src= {icon} alt="activity" id={styles.image}/>
                <div className={styles.text}>
                <p id={styles.creator}>{props.will.nomeproprietario}</p>
                <p id={styles.title}>{props.will.titolo}</p>
                <p id={styles.date}>{props.will.data}</p>
                </div>
            </div>
            </div>
        )} />   
    )
}
