let i = 0;


document.querySelector('#previousButton').addEventListener('click', ()=>{
	i = i-1;
	document.querySelector('#actualPage').value = i;
});

document.querySelector('#nextButton').addEventListener('click', ()=>{
	i = i+1;
	document.querySelector('#actualPage').value = i;
});