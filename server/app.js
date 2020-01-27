let i = 0;


document.querySelector('#previousButton').addEventListener('click', ()=>{
	i = i-1;
	document.querySelector('#actualPage').value = i;
});

document.querySelector('#nextButton').addEventListener('click', ()=>{
	i = i+1;
	document.querySelector('#actualPage').value = i;
});




db.get(`SELECT data FROM bloc WHERE id='${range}';`, (err, result) => {
	if (err) {
		console.log(err);
	}
	else {
		//result
	}
})