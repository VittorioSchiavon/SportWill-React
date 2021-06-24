import React from "react";
import styles from "./Homepage.module.css";
import { Route } from "react-router-dom";
import WillCard from "../components/WillCard";
import { useState, useEffect } from "react";
//import { getData } from "../services/WillData";
import * as Auth from "../services/Auth";

export default function Homepage(props) {
  const [willData, setWillData] = useState();
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);

  function checkboxInputChange(e) {
    setChecked((prevChecked) => !prevChecked);
    console.log(checked);
  }

  function displayContent() {
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

  useEffect(() => {
    fetch("http://synchost.ns0.it:8080/uscite/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWillData(data);
      });
    setLoading(false);

    console.log(Auth.isAuthenticated());
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
                history.push("/Edit/new");
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
