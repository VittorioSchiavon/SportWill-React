import React from "react";
import styles from "./EditWill.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import * as Auth from "../services/Auth";
import { sports } from "../services/sports";
import Message from "../components/Message";

export default function EditWill() {
  const [loading, setLoading] = useState(true); //stato che memorizza se sono in fase di caricamento
  const [ID] = useState(useParams().id); //stato che prende l'ID dall'URL: puo' essere "new" se bisogna creare una nuova Will o un numero, ovvero l'ID della Will da modificare
  const [today] = useState(setDate()); //memorizzo la data odierna nel formato corretto
  const [message, setMessage] = useState(""); // memorizzo il messaggio per il popUp

  const [will, setWill] = useState({ //stato che memorizza i campi dati della Will, creata o modificata
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

  const [touched, setTouched]=useState({ //memorizzo se il campo input è stato alterato o meno, serve per il display degli alert
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

  function handleChange(e) { // funzione invocata ogni volta che avviene un cambiamento in un campo di input: viene aggiornato il valore e messo a true la flag Touched
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

  function deleteWill() { // Funzione invocata quando viene premuto il tasto delete: effettua una  chiamata HTTP DELETE al server indicando l'ID della will da eliminare
    if (ID !== "new")
    
      fetch("http://synchost.ns0.it:8080/uscite/elimina/" + will.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.getToken()}`, //JSON token per l'autenticazione
        },
      })
      .then((response) => {
        console.log(response);
        response.status !== 200              //crea un popUp Message con contenuto variabile in base alla risposta affermativa o meno dal server
          ? setMessage("Error, try again.")
          : setMessage("Will Removed Successfully.");
        return response.json();
      })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          setMessage("Error, try again.");
          console.error("Error:", error);
        });
  }
  function submitChanges() {
    fetch("http://synchost.ns0.it:8080/uscite/inserisci", { //Funzione simile a deleteWill(). Invia una richiesta HTTP POST passando la will. Essa verrà creata o modificata nel database 
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
          : setMessage("Will Saved Successfully.");
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        setMessage("Error, try again.");
        console.error("Error:", error);
      });
  }
  function setDate() {  //Imposta la data di oggi formattata nel modo consono
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

  useEffect(() => {  //Invocata ogni volta che il componente viene creato. Ottiene dal server la Will da modificare. se l?ID è "new" vuol dire che bisgona crearne una da zero
    if (ID !== "new") {
      console.log(ID)
      fetch(`http://synchost.ns0.it:8080/uscite/${ID}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setWill(data);        //imposto lo stato Will con i dati appena ottenuti
          setLoading(false);    //imposto lo stato loading a false per indicare che ho ottenuto i dati
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
                  cols="20" rows="5"
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
