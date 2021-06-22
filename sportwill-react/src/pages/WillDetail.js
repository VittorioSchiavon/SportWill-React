import React from 'react'
import styles from "./WillCard.module.css"

export default function WillDetail(props) {
    return (
        <div>
        <form >
            <h1 id="loading">Loading Data...</h1>
                <div class="container" >
                <h1>{props.will.titolo}</h1>
                <img src="imgSrc" id="activity" alt="activity"/>

                    <div class="elementContainer">



                    <div class="element">
                        <div class="labelContainer">
                        <img src="../../assets/Icons/user.svg"alt="User Icon"/>
                        <label for="date">User</label>
                        </div>
                        <div class="info">{props.will.nomeproprietario}</div>

                    </div>


                    <div class="element">
                        <div class="labelContainer">
                        <img src="../../assets/Icons/date.svg"alt="Date Icon"/>
                        <label for="date">Date</label>
                        </div>
                        <div class="info">{props.will.data}</div>

                    </div>

                    <div class="element">
                        <div class="labelContainer">
                        <img src="../../assets/Icons/time.svg"alt="Time Icon"/>
                        <label for="time">Time</label>
                        </div>
                        <div class="info">{props.will.ora}</div>

                    </div>

                    <div class="element">
                        <div class="labelContainer">
                        <img src="../../assets/Icons/length.svg"alt="Length Icon"/>
                        <label for="length">Length</label>
                        </div>

                        <div class="info">{props.will.lunghezza}</div>
                    </div>

                    <div class="element">
                        <div class="labelContainer">
                        <img src="../../assets/Icons/place.svg"alt="Place Icon"/>
                        <label for="place">Place</label>
                        </div>

                        <div class="info">{props.will.luogo}</div>

                    </div>

                    <div class="element">
                        <div class="labelContainer">
                        <img src="../../assets/Icons/stages.svg"alt="Stages Icon"/>
                        <label for="stages">Stages</label>
                        </div>

                        <div class="info">{props.will.tappe}</div>

                    </div>

                    <div class="element">
                        <div class="labelContainer">
                        <img src="../../assets/Icons/number.svg"alt="Number of Partecipants Icon"/>
                        <label for="numb">Partecipants</label>
                        </div>

                        <div class="info">{props.will.numpart}</div>
                    </div>

                    <div class="element">
                        <div class="labelContainer">
                        <img src="../../assets/Icons/description.svg"alt="Description Icon"/>
                        <label for="description">Description</label>
                        </div>

                        <div class="info">{props.will.descrizione}</div>

                    </div>
                    </div>

                    <div class="buttons">
                        <button type="button" class="goBack" routerLink="/homepage">Go Back</button>
                        <button type="button"class="deletebtn">Delete</button>
                        <button >Save Changes</button>
                    </div>
                </div>
            </form>
        </div>

    )
}
