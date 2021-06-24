import React from "react";
import styles from "./Message.module.css";

export default function Message({ message , okFunction}) {

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 id={styles.message}>{message}</h1>
        <div className={styles.button} onClick={() => {
                    okFunction();
                    if(!message.includes("Error")) window.location.href='/Home';}}
                    > Got It!</div>
     {/*   <Route
            render={({ history }) => (
              <button
                className={styles.button}
                onClick={() => {
                    okFunction();
                    !message.includes("Error") && history.push("/Home");
                }}>
                Home
              </button>
            )}
            /> */}   </div>
    </div>
  );
}
