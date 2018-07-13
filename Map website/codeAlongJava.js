var map;
var view;
var ourLoc;

 function init() {
	 ourLoc =  ol.proj.fromLonLat([-83.6275, 33.89694]);
	 
	view = new ol.View({
          center: ourLoc,
          zoom: 4
	});
	
	map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: view
      });
	}
 
 function panHome() {
	view.animate({
    center: ourLoc,
    duration: 2000
    });
  }
  
  function panLoc() {
	  var userInput = document.getElementById("input").value;
	  if (userInput == ""){
		  alert("yOU nO TyPE counTRYYY!!");
		  return;
	  }
	  
	  var query = "http://restcountries.eu/rest/v2/name/" + userInput;
	  query = query.replace(/ /g, "%20");
	  
	  countryRequest = new XMLHttpRequest();
	  countryRequest.open('GET', query, true);
	  countryRequest.onload = processCountryRequest;
	  countryRequest.send();
  }
 
 
function processCountryRequest(){
    if(countryRequest.readyState != 4) {
		return;
	} else if(countryRequest.status != 200){
		return;
	} else if(countryRequest.responseText == "") {
		return;
	}

	var countryInformation = JSON.parse(countryRequest.responseText);
	var lon = countryInformation[0].latlng[1];
	var lat = countryInformation[0].latlng[0];

	view.animate({
		center: ol.proj.fromLonLat([-83.6275, 33.89694]);,
		duration: 2000 
	});
}




 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  window.onload = init;