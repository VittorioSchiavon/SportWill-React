import React from 'react'
import styles from  './Homepage.module.css'
import {Route} from "react-router-dom"
import WillCard from "../components/WillCard"
import { useState, useEffect } from 'react';
import {getData} from "../services/WillData"

export default function Homepage() {

    var will =[{
        nomeproprietario:"ciao1",
        titolo:"titolo",
        data:"data"
    },
    {
        nomeproprietario:"ciao2",
        titolo:"titolo",
        data:"data"
    },
    {
        nomeproprietario:"ciao3",
        titolo:"titolo",
        data:"data"
    },
    {
        nomeproprietario:"ciao4",
        titolo:"titolo",
        data:"data"
    },
    {
        nomeproprietario:"ciao5",
        titolo:"titolo",
        data:"data"
    },
];
useEffect(() => {
    getData();

}, [])
    
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Home Page</h1>
        <div className={styles.switch}>
            <input type="checkbox" />
            <p>Find only my activities</p>
        </div>
        <h1  className={styles.loading}>Loading Data...</h1>
        <div className={styles.cardContainer}>
            {will.map((will) =>
            <WillCard key={will.nomeproprietario}
                    will={will} />
            )}
        </div>
        <Route render={({history}) => (
        <button className={styles.addWill} onClick={() => { history.push('/Add') }}>+</button>)} />      
        </div>


    )
}
