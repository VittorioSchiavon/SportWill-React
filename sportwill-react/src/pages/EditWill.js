import React from "react";
import styles from "./EditWill.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import * as Auth from "../services/Auth";
import { sports } from "../services/sports";
import Message from "../components/Message";

export default function EditWill() {
  const [loading, setLoading] = useState(true);
  const [ID] = useState(useParams().id);
  const [today] = useState(setDate());
  const [message, setMessage] = useState("");

  const [will, setWill] = useState({
    proprietario: Auth.getUserEmail(),
    data: "",
    descrizione: "",
    lunghezza: "",
    luogo: "",
    numpart: "",
    ora: "",
    sport: "Other",
    tappe: "",
    titolo: "",
    nomeproprietario: Auth.getUserFullName(),
  });

  const [touched, setTouched]=useState({
    data: false,
    descrizione: false,
    lunghezza: false,
    luogo: false,
    numpart: false,
    ora: false,
    sport: false,
    tappe: false,
    titolo: false,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setWill((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setTouched((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    }

  function deleteWill() {
    if (ID !== "new")
      fetch("http://synchost.ns0.it:8080/uscite/elimina/" + will.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.getToken()}`,
        },
        //body: JSON.stringify(will),
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
          //window.location.href = '/Home';
        })
        .catch((error) => {
          setMessage("Error, try again.");
          console.error("Error:", error);
        });
  }
  function submitChanges() {
    fetch("http://synchost.ns0.it:8080/uscite/inserisci", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(will),
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
        //setMessage(data.toString());
        //window.location.href = '/Home';
        //data.codice!=="200" ? setMessage("Error, try again.") : setMessage("Operation Successfully Completed!");
      })
      .catch((error) => {
        setMessage("Error, try again.");
        console.error("Error:", error);
      });
  }
  function setDate() {
    var todayDate = new Date();
    var todayTemp = "";
    todayTemp = todayDate.getFullYear() + "-";
    if ((todayDate.getMonth() + 1).toString().length === 1) {
      todayTemp += "0";
    }
    todayTemp += (todayDate.getMonth() + 1).toString() + "-";

    if (todayDate.getDate().toString().length === 1) {
      todayTemp += "0";
    }
    todayTemp += todayDate.getDate().toString();
    return todayTemp;
  }

  useEffect(() => {
    if (ID !== "new") {
      fetch(`http://synchost.ns0.it:8080/uscite/${ID}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setWill(data);
          setLoading(false);
        })
        .catch((error) => {
          setMessage("Error, try again.");
          console.error("Error:", error);
        });
    } else {
      setLoading(false);
    }
  }, [ID]);

  return (
    <div>
      <div id={styles.form}>
        {loading ? (
          <h1 className={styles.loading}>Loading Data...</h1>
        ) : (
          <div className={styles.container}>
              <h1 className={styles.pageTitle}>{will.id===undefined ? "Create Will": "Modify Will"} </h1>
            <img
              src={`../../assets/SportImages/Icons/${will.sport}.svg`}
              id={styles.activity}
              alt="activity"
            />

            <div className={styles.elementContainer}>
              <div className={styles.element}>
                <div className={styles.labelContainer}>
                  <img src="../../assets/Icons/title.svg" alt="Title Icon" />
                  <label className={styles.label} htmlFor="titolo">
                    Title*
                  </label>
                </div>
                <input
                  type="text"
                  name="titolo"
                  value={will.titolo}
                  onChange={(e) => handleChange(e)}
                  className={styles.input}
                />
                {(will.titolo === ""&& touched.titolo) && (
                  <div className={styles.alert}>Please insert a Title.</div>
                )}
              </div>

              <div className={styles.element}>
                <div className={styles.labelContainer}>
                  <img src="../../assets/Icons/sports.svg" alt="Sport Icon" />
                  <label className={styles.label} htmlFor="sport">
                    Sport*
                  </label>
                </div>
                <select
                  name="sport"
                  value={will.sport}
                  onChange={(e) => handleChange(e)}
                  className={styles.input}
                >
                  {sports.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.element}>
                <div className={styles.labelContainer}>
                  <img src="../../assets/Icons/date.svg" alt="Date Icon" />
                  <label className={styles.label} htmlFor="data">
                    Date*
                  </label>
                </div>
                <input
                  type="date"
                  name="data"
                  min={today.toString()}
                  value={will.data}
                  onChange={(e) => handleChange(e)}
                  className={styles.input}
                />
                {(will.data === ""&& touched.data) && (
                  <div className={styles.alert}>Please insert a Date.</div>
                )}
              </div>

              <div className={styles.element}>
                <div className={styles.labelContainer}>
                  <img src="../../assets/Icons/time.svg" alt="Time Icon" />
                  <label className={styles.label} htmlFor="ora">
                    Time*
                  </label>
                </div>
                <input
                  type="time"
                  name="ora"
                  value={will.ora}
                  onChange={(e) => handleChange(e)}
                  className={styles.input}
                />
                {(will.ora === ""&& touched.ora) && (
                  <div className={styles.alert}>Please insert a Time.</div>
                )}
              </div>

              <div className={styles.element}>
                <div className={styles.labelContainer}>
                  <img src="../../assets/Icons/length.svg" alt="Length Icon" />
                  <label className={styles.label} htmlFor="lunghezza">
                    Length*
                  </label>
                </div>

                <input
                  type="number"
                  name="lunghezza"
                  value={will.lunghezza}
                  min="0"
                  onChange={(e) => handleChange(e)}
                  className={styles.input}
                />
                {(will.lunghezza === ""&& touched.lunghezza) && (
                  <div className={styles.alert}>Please insert a Length.</div>
                )}
              </div>

              <div className={styles.element}>
                <div className={styles.labelContainer}>
                  <img src="../../assets/Icons/place.svg" alt="Place Icon" />
                  <label className={styles.label} htmlFor="luogo">
                    Place*
                  </label>
                </div>

                <input
                  type="text"
                  name="luogo"
                  value={will.luogo}
                  onChange={(e) => handleChange(e)}
                  className={styles.input}
                />
                {(will.luogo === ""&& touched.luogo) && (
                  <div className={styles.alert}>Please insert a Place.</div>
                )}
              </div>

              <div className={styles.element}>
                <div className={styles.labelContainer}>
                  <img src="../../assets/Icons/stages.svg" alt="Stages Icon" />
                  <label className={styles.label} htmlFor="tappe">
                    Stages*
                  </label>
                </div>

                <input
                  type="text"
                  name="tappe"
                  value={will.tappe}
                  onChange={(e) => handleChange(e)}
                  className={styles.input}
                />
                {(will.tappe === ""&& touched.tappe) && (
                  <div className={styles.alert}>Please insert Stages.</div>
                )}
              </div>

              <div className={styles.element}>
                <div className={styles.labelContainer}>
                  <img
                    src="../../assets/Icons/number.svg"
                    alt="Number of Partecipants Icon"
                  />
                  <label className={styles.label} htmlFor="numpart">
                    Partecipants*
                  </label>
                </div>

                <input
                  type="number"
                  name="numpart"
                  value={will.numpart}
                  min="0"
                  onChange={(e) => handleChange(e)}
                  className={styles.input}
                />
                {(will.numpart === ""&& touched.numpart) && (
                  <div className={styles.alert}>
                    Please insert the Partecipants.
                  </div>
                )}
              </div>

              <div className={styles.element}>
                <div className={styles.labelContainer}>
                  <img
                    src="../../assets/Icons/description.svg"
                    alt="Description Icon"
                  />
                  <label className={styles.label} htmlFor="descrizione">
                    Description*
                  </label>
                </div>

                <textarea
                  type="text"
                  name="descrizione"
                  value={will.descrizione}
                  cols="30" rows="5"
                  onChange={(e) => handleChange(e)}
                  className={styles.input}
                />
                {(will.descrizione === ""&& touched.descrizione) && (
                  <div className={styles.alert}>
                    Please insert a Description.
                  </div>
                )}
              </div>
            </div>

            <div className={styles.buttons}>
              <Route
                render={({ history }) => (
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => {
                      history.push("/Home");
                    }}
                  >
                    Go Back
                  </button>
                )}
              />
              {ID !== "new" && (
                <button
                  type="button"
                  className={[styles.deletebtn, styles.button].join(' ')}
                  onClick={() => deleteWill()}
                >
                  Delete
                </button>
              )}
              <button
              className={styles.button}
                disabled={Object.values(will).some(
                  (x) => x === null || x === ""
                )}
                onClick={() => submitChanges()}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
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
