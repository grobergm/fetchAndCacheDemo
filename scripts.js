
function fetchDogBreeds(){
 return fetch('https://dog.ceo/api/breeds/list/all')
 .then(function(response){
  return response.json()
 })
}
function cacheBreeds(){
  if (!localStorage['breeds']){
    fetchDogBreeds().then(function(response){     
      localStorage['breeds']=
      JSON.stringify(Object.keys(response.message))
      addBreedsToSelect()
  	})
 }
}

function addBreedsToSelect(){
	if(localStorage['breeds']){
		const breeds=JSON.parse(localStorage['breeds'])
  	breeds.forEach(function(breed){
    $('#dogBreedSelection').append(`<option>${breed}</option>`)
  })
	}
}

function fetchRandomDog(breed){
	return fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
	.then(function(response){
		return response.json()
	})
}

function showDog(dogUrl){
	$('#dogContainer').html(`<img id='coolDog' class='col dog' src=${dogUrl}>`)
}

function showCoolDogs(){
	console.log('coolD')
	if(localStorage['coolDogs']){
		console.log('coolDogs found')
		let coolDogs=JSON.parse(localStorage['coolDogs'])
		$('#coolDogs').html('');
		coolDogs.forEach(function(dog){
			$('#coolDogs').append(`
				<div class="card" style="width: 18rem;">
	        <img src=${dog.url} class="col dog" >
				  <div class="card-body">
				    <h5 class="card-title">${dog.breed}</h5>
				  </div>
				</div>
				`)
		})
	} else {
		localStorage['coolDogs']='[]'
		console.log(localStorage)
	}	
}

$(document).ready(function(){

	cacheBreeds()
  addBreedsToSelect()
	showCoolDogs()
	let currentDog={};
	fetchRandomDog('boxer').then(function(response){
		currentDog.url=response.message;
    currentDog.breed='boxer';
		showDog(response.message)
	})

	
	$('#fetchDog').click(function(){
  	let breedSelected= $('#dogBreedSelection').val()
  	fetchRandomDog(breedSelected)
  	.then(function(response){
    	currentDog.url=response.message;
    	currentDog.breed=breedSelected;
    	console.log(currentDog)
    	showDog(currentDog.url);
  	})
 	})

	$('#cacheDog').click(function(){
	  if (localStorage['coolDogs']){
	    let newCoolDogs=JSON.parse(localStorage['coolDogs'])
	    newCoolDogs.push(currentDog)
	    localStorage['coolDogs']=JSON.stringify(newCoolDogs) 
	  } else {
	  	  localStorage['coolDogs']=JSON.stringify([currentDog])
	  	}
	  showCoolDogs()
	})

})
