import React from "react";
import styles from "./SignIn.module.css";
import { useState } from "react";
import { Link, Route } from "react-router-dom";
import Message from "../components/Message";

export default function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage]=useState("");
  const [touched, setTouched]=useState({
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

  function signIn() {
    fetch("http://synchost.ns0.it:8091/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        /*Authorization: `Bearer ${localStorage.getItem("token")}`,*/
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
        data.error===undefined && localStorage.setItem("userData", JSON.stringify(data));
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
          id={styles.password}
          className={styles.input}
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
            onClick={() => signIn()}
            disabled={user.email === "" || user.password === ""}
          >
            Sign In
          </button>
        </div>
        <div id={styles.links}>
          <Link to="/SignUp" className={styles.link}>
            Sign Up
          </Link>
        </div>
      </div>
      {message!=="" && <Message message={message} okFunction={()=>{setMessage("")}}/>}
    </div>
  );
}
