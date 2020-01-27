//Initialisation
let id = 1;
callData();




// récupération des données
function callData() {
	document.querySelector('#actualPage').value = id;
	fetch(`http://localhost:3000/page/${id}`)
	.then(r => r.json())
	.then(data => {
		document.querySelector('#date').innerHTML = data.date;
		document.querySelector('#text').innerHTML = data.text;
	});
}



// Récupérer le numéro de la page rentré à la main
document.querySelector('#actualPage').addEventListener('keyup', (event)=>{
	if (event.key === "Enter") {
		id = document.querySelector('#actualPage').value;
		callData();
	}
});


document.querySelector('#previousButton').addEventListener('click', ()=>{
	id = id-1;
	callData();
});

document.querySelector('#nextButton').addEventListener('click', ()=>{
	id = id+1;
	callData();
});




