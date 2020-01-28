//Initialisation
let id = 1;
let numPage = 1;
callData();

// récupération des données
function callData() {
  document.querySelector("#actualPage").value = id;
  fetch(`http://localhost:4000/page/${id}`)
    .then(r => r.json())
    .then(data => {
      console.log(data);
      document.querySelector("#date").innerHTML = new Date(data.date).toDateString();
      document.querySelector("#text").innerHTML = data.text;
      numPage = data.max;
      document.querySelector("#numPage").innerHTML = `/ ${numPage}`;
    });
}

// Récupérer le numéro de la page rentré à la main
document.querySelector("#actualPage").addEventListener("keyup", event => {
  if (event.key === "Enter") {
    id = document.querySelector("#actualPage").value;
    callData();
  }
});

document.querySelector("#previousButton").addEventListener("click", () => {
  if (id > 1) {
    id = id - 1;
    callData();
  }
});

document.querySelector("#nextButton").addEventListener("click", () => {
  if (id < numPage) {
    id = id + 1;
    callData();
  }
});
