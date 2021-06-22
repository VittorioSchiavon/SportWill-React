import React from 'react'
import styles from "./WillCard.module.css"


export default function WillCard(props) {

    return (
        <div id={styles.willCard}>
        <div id={styles.nameContainer}>
            <img src= {"./assets/SportImages/Icons/Baseball.svg"} alt="activity" id={styles.image}/>
            <div className={styles.text}>
            <p id={styles.creator}>{props.will.nomeproprietario}</p>
            <p id={styles.title}>{props.will.titolo}</p>
            <p id={styles.date}>{props.will.data}</p>
            </div>
        </div>
        </div>
    )
}
