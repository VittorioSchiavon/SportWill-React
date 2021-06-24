var getDataUrl = "http://synchost.ns0.it:8080/uscite/53";
//var sendDataUrl = "http://synchost.ns0.it:8080/uscite/inserisci";
//var deleteDataUrl = "http://synchost.ns0.it:8080/uscite/elimina/";

export const getData = () => {
  fetch(getDataUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
};
