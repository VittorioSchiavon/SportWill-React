import React from 'react'
import styles from "./SignUp.module.css"
import { useState } from "react";
import { Link, Route } from "react-router-dom";
import Message from '../components/Message';

export default function SignUp() {
    const [user, setUser] = useState({
      nome:"",
      cognome:"",
      email: "",
      password: "",
    });
    const [message, setMessage]=useState("");
    const [touched, setTouched]=useState({
      nome:false,
      cognome:false,
      email: false,
      password: false,
    });
    function handleChange(e) {
      const { name, value } = e.target;
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setTouched((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    }
  
    function signUp() {
      fetch("http://synchost.ns0.it:8091/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      .then((response) => {
        console.log(response);
        response.status !== 200
          ? setMessage("Error, try again.")
          : setMessage("Operation Successfully Completed!");
        return response.json();
      })
        .then((data) => {
          console.log("Success:", data);
          data.error===undefined &&  localStorage.setItem("userData", JSON.stringify(data));
          //setMessage(data.toString());
          //window.location.href = '/Home';
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  
    return (
      <div id={styles.form}>
        <div className={styles.container}>
          <h1 id={styles.title}>Sign In</h1>
          <p className={styles.label}>Please fill in this form to log in.</p>
          
          <label className={styles.label} htmlFor="nome">
            <b>Name*</b>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            required
            name="nome"
            value={user.nome}
            className={styles.input}
            onChange={(e) => handleChange(e)}
          />
          {(user.nome === "" && touched.nome) && (
            <div className={styles.alert}>Please insert a Name.</div>
          )}
            <label className={styles.label} htmlFor="cognome">
            <b>Surname*</b>
          </label>
          <input
            type="text"
            placeholder="Enter Surname"
            required
            name="cognome"
            value={user.cognome}
            className={styles.input}
            onChange={(e) => handleChange(e)}
          />
          {(user.cognome === "" && touched.cognome) && (
            <div className={styles.alert}>Please insert a Surname.</div>
          )}
          <label className={styles.label} htmlFor="email">
            <b>Email*</b>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            required
            name="email"
            value={user.email}
            className={styles.input}
            onChange={(e) => handleChange(e)}
          />
          {(user.email === "" && touched.email) && (
            <div className={styles.alert}>Please insert an Email.</div>
          )}
          <label className={styles.label} htmlFor="password">
            <b>Password*</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
            className={styles.input}
            id={styles.password}
            required
          />
          {(user.password === "" && touched.password) && (
            <div className={styles.alert}>Please insert the password.</div>
          )}
          <div className={styles.buttons}>
            <Route
              render={({ history }) => (
                <button
                  type="button"
                  className={[styles.button, styles.cancelbtn].join(' ')}
                  onClick={() => {
                    history.push("/Home");
                  }}
                >
                  Cancel
                </button>
              )}
            />
  
            <button
              className={styles.button}
              onClick={() => signUp()}
              disabled={user.email === "" || user.password === "" || user.name === "" || user.surname === ""}
            >
              Sign Up
            </button>
          </div>
          <div id={styles.links}>
            <Link to="/SignIn" className={styles.link}>
              Sign In
            </Link>
          </div>
        </div>
        {message!=="" && <Message message={message} okFunction={()=>{setMessage("")}}/>}
      </div>
    );
  }
  