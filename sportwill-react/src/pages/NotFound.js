import React from "react";
import Message from "../components/Message";
import { useState } from "react";

export default function NotFound() {
  const [message, setMessage] = useState("Sorry, Page Not Found."); // crea un Messaggio di errore
  return (
    <Message
      message={message}
      okFunction={() => { 
        setMessage("");
      }}
    />
  );
}
