import React from "react";
import styles from "./Homepage.module.css";
import { Route } from "react-router-dom";
import WillCard from "../components/WillCard";
import { useState, useEffect } from "react";
import * as Auth from "../services/Auth";

export default function Homepage(props) {
  const [willData, setWillData] = useState(); // insieme di tutte le Will ottenute
  const [loading, setLoading] = useState(true); 
  const [checked, setChecked] = useState(false); //memorizza il valore della checkbox

  function checkboxInputChange(e) { //cambia il valore della checkbox
    setChecked((prevChecked) => !prevChecked);
    console.log(checked);
  }

  function displayContent() {  //funziuone di support che ritorna il JSX da visualizzare in base a se l'utente ha effettuato l'accesso e se si sono ottenuti i dati
    if (!loading && willData !== null && willData !== undefined) {
      return (
        <div className={styles.cardContainer}>
          {willData.map((will) =>
            (checked && will.proprietario === Auth.getUserEmail()) ||
            !checked ? (
              <WillCard key={will.id} will={will} />
            ) : (
              ""
            )
          )}
        </div>
      );
    } else {
      return <h1 className={styles.loading}>Loading Data...</h1>;
    }
  }

  useEffect(() => { //invocata quando il componente viene creato, ottiene i dati delle will daol server  
    fetch("http://synchost.ns0.it:8080/uscite/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWillData(data);
      });
    setLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Home Page</h1>
      {Auth.isAuthenticated() && (
        <div className={styles.switch}>
          <input
            type="checkbox"
            value={checked}
            className={styles.input}
            onClick={(e) => checkboxInputChange(e)}
          />
          <p>Find only my activities</p>
        </div>
      )}
      {Auth.isAuthenticated() && (
        <Route
          render={({ history }) => (
            <button
              className={styles.addWill}
              onClick={() => {
                history.push("/Edit/new"); // quando l'elemento viene cliccato torna alla Home
              }}
            >
              +
            </button>
          )}
        />
      )}
      {displayContent()}
    </div>
  );
}
