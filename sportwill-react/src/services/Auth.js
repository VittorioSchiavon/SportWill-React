//Funzioni di supporto per l'autenticazione

export var authenticated = isAuthenticated();

export function isAuthenticated() {
  return localStorage.getItem("userData") != null;
}

export function getToken() {
  if (this.isAuthenticated()) {
    var temp = JSON.parse(localStorage.getItem("userData"));
    return temp.token;
  }
  return "";
}

export function logout() {
  localStorage.removeItem("userData");
  authenticated = false;
  console.log("logout successfully");
}

export function getUserEmail() {
  if (this.isAuthenticated()) {
    return JSON.parse(localStorage.getItem("userData")).email;
  }
  return "";
}

export function getUserFullName() {
  if (isAuthenticated()) {
    var temp = JSON.parse(localStorage.getItem("userData") + "");
    return temp.nome + " " + temp.cognome;
  }
  return "";
}
