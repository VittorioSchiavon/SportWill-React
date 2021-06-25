import React from "react";
import styles from "./Header.module.css";
import logo from "../assets/Images/logo.png";
import { Route, Link } from "react-router-dom";
import * as Auth from "../services/Auth";
import { useState } from "react";
import Message from "./Message";

export default function Header() {
  const [message, setMessage] = useState(""); //questo stato memorizza il contenuto del messaggio da mostrare a pop-Up utilizzando il componente Message

  return (
    <div className={styles.topnav}>
      {/*Logo, se cliccato navighi nella Home */}
      <Route
        render={({ history }) => (
          <img
            src={logo}
            alt="logo"
            className={styles.logo}
            onClick={() => {
              history.push("/Home");
            }}
          />
        )}
      />
      {/* Link Home e Login/Logout*/}
      <div className={styles.container}>
        <Link to="/Home" className={[styles.link, styles.homeLink].join(" ")}>
          Home
        </Link>
        {!Auth.isAuthenticated() ? (
          <Link to="/SignIn" className={styles.link}>
            Login
          </Link>
        ) : (
          <div
            className={styles.link}
            onClick={() => {
              Auth.logout();
              setMessage("You Are Now Logged Out.");
            }}
          >
            Logout
          </div>
        )}
      </div>
      {/*Se il messaggio memorizzato nello stato è nullo elimina il componente. Gli viene passata la funzione setMessage come porps per resettare il messaggio */}
      {message !== "" && (
        <Message
          message={message}
          okFunction={() => {
            setMessage("");
          }}
        />
      )}
    </div>
  );
}
