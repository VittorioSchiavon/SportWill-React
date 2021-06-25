import React from 'react'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react';
import styles from "./WillDetail.module.css"
import { Route } from 'react-router-dom';

export default function WillDetail() {
    const ID = useParams().id; //memorizza l'id ottenuto dall'URL relativo ad una Will
    const [will, setWill]=useState(); //memorizza i dati della will
    const [loading, setLoading]=useState(true); //stato che memorizza se sono in fase di caricamento


    useEffect(() => { //invocata quando il componente viene creato: ottiene i dati della Will relativa all'ID con una chiamata HTTP GET al server
        console.log(ID);
                    
        fetch(`http://synchost.ns0.it:8080/uscite/${ID}`)
        .then(res=>{
            return res.json()
        })
        .then(data=> {
            console.log(data);
            setWill(data);
            setLoading(false);
        });
    },[ID]);

    return (
        <div>
        <form id={styles.form}>
            {loading ? <h1 id={styles.loading}>Loading Data...</h1>
            :   <div className={styles.container} >
                <h1 className={styles.title}>{will.titolo}</h1>
                <img src={`../../assets/SportImages/Icons/${will.sport}.svg`} id={styles.activity} alt="activity"/>

                    <div className={styles.elementContainer}>

                    <div className={styles.element}>
                        <div className={styles.labelContainer}>
                            <img src="../../assets/Icons/user.svg"alt="User Icon"/>
                            <label className={styles.label} htmlFor="date">User</label>
                            </div>
                        <div className={styles.info}>{will.nomeproprietario}</div>

                    </div>


                    <div className={styles.element}>
                        <div className={styles.labelContainer}>
                            <img src="../../assets/Icons/date.svg"alt="Date Icon"/>
                            <label className={styles.label} htmlFor="date">Date</label>
                            </div>
                        <div className={styles.info}>{will.data}</div>

                    </div>

                    <div className={styles.element}>
                        <div className={styles.labelContainer}>
                            <img src="../../assets/Icons/time.svg"alt="Time Icon"/>
                            <label className={styles.label} htmlFor="time">Time</label>
                            </div>
                        <div className={styles.info}>{will.ora}</div>

                    </div>

                    <div className={styles.element}>
                        <div className={styles.labelContainer}>
                            <img src="../../assets/Icons/length.svg"alt="Length Icon"/>
                            <label className={styles.label} htmlFor="length">Length</label>
                            </div>

                        <div className={styles.info}>{will.lunghezza}</div>
                    </div>

                    <div className={styles.element}>
                        <div className={styles.labelContainer}>
                            <img src="../../assets/Icons/place.svg"alt="Place Icon"/>
                            <label className={styles.label} htmlFor="place">Place</label>
                            </div>

                        <div className={styles.info}>{will.luogo}</div>

                    </div>

                    <div className={styles.element}>
                        <div className={styles.labelContainer}>
                            <img src="../../assets/Icons/stages.svg"alt="Stages Icon"/>
                            <label className={styles.label} htmlFor="stages">Stages</label>
                            </div>

                        <div className={styles.info}>{will.tappe}</div>

                    </div>

                    <div className={styles.element}>
                        <div className={styles.labelContainer}>
                            <img src="../../assets/Icons/number.svg"alt="Number of Partecipants Icon"/>
                            <label className={styles.label} htmlFor="numb">Partecipants</label>
                            </div>

                        <div className={styles.info}>{will.numpart}</div>
                    </div>

                    <div className={styles.element}>
                        <div className={styles.labelContainer}>
                            <img src="../../assets/Icons/description.svg"alt="Description Icon"/>
                            <label className={styles.label} htmlFor="description">Description</label>
                            </div>

                        <div className={styles.info}>{will.descrizione}</div>

                    </div>
                    </div>

                    <div className={styles.buttons}>
                        <Route render={({history}) => (
                        <button type="button" className={ styles.button} onClick={() => { history.push('/Home') }}>Go Back</button>)} />
                    </div>
                </div>
                }
            </form>
        </div>

    )
}
