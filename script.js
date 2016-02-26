//Trucks JSON Data
var trucksJSON = {
	trucks: [
		{
			name: "Truck 1",
			position: {
				lat: 33.59,
				lng: -116.0
			}
		},
		{
			name: "Truck 2",
			position: {
				lat: 34.59,
				lng: -115.0
			}
		},
		{
			name: "Truck 3",
			position: {
				lat: 35.59,
				lng: -115.0
			}
		},
		{
			name: "Truck 4",
			position: {
				lat: 35.59,
				lng: -116.0
			}
		},
		{
			name: "Truck 5",
			position: {
				lat: 34.59,
				lng: -116.0
			}
		},
		{
			name: "Truck 6",
			position: {
				lat: 35.59,
				lng: -116.5
			}
		},
		{
			name: "Truck 7",
			position: {
				lat: 33.59,
				lng: -116.5
			}
		},
		{
			name: "Truck 8",
			position: {
				lat: 35.0,
				lng: -116.0
			}
		},
		{
			name: "Truck 9",
			position: {
				lat: 34.0,
				lng: -116.3
			}
		},
		{
			name: "Truck 10",
			position: {
				lat: 34.5,
				lng: -116.7
			}
		}

	]
};


var map;
var markers = [];


function initialize() {
	var mapjson = {
		center:new google.maps.LatLng(34.59,-117.0),
		zoom:7,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	map=new google.maps.Map(document.getElementById("googleMap"),mapjson);
	var myLatlng = new google.maps.LatLng(34.0,-117.0);
	var image ="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

	for (var i = 0; i < trucksJSON.trucks.length; i++) {
		var truck=trucksJSON.trucks[i];
		var marker = new google.maps.Marker({
			position : new google.maps.LatLng(truck.position.lat,truck.position.lng),
			map: map,
			title: truck.name,
			icon:image
		});
		markers.push(marker);
	};
	updateTrucksJSONOnDOM();
}
google.maps.event.addDomListener(window, 'load', initialize);

// Panning based on movement of markers

function recenterMapBasedOnMarkers() {
  	var bounds = new google.maps.LatLngBounds();
  	for (var i = 0; i < markers.length; i++) {
    	bounds.extend(markers[i].getPosition());
  	}
  	map.fitBounds(bounds);
}
// Randomly updating position of trucksJSON object
function updateTrucksJSON() {
	var truckStatusString = "";
	for (var idx = 0, length = trucksJSON.trucks.length / 2 ; idx < length+1; idx++) {
		var randomTruckIdx = parseInt(Math.random() * (trucksJSON.trucks.length - 0) + 0);
		var currentPosition = trucksJSON.trucks[randomTruckIdx].position;
		currentPosition.lat = currentPosition.lat + 1;
		currentPosition.lng = currentPosition.lng + 1;
		truckStatusString += "Changed position for Truck: " + randomTruckIdx + "<br/>";
	}
	document.getElementById("truckChangeStatus").innerHTML = truckStatusString;
}
// Updating google maps 
function updatePosition(){
	updateTrucksJSON();

	for (var idx = 0, length = markers.length; idx < length; idx++) {
		var marker = markers[idx];
		var truckPosition = trucksJSON.trucks[idx].position;
		marker.setPosition(new google.maps.LatLng(truckPosition.lat, truckPosition.lng));
	}
	recenterMapBasedOnMarkers();
	updateTrucksJSONOnDOM();
}
// Live update of changing locations in the screen
function updateTrucksJSONOnDOM() {
	document.getElementById("trucksJSONData").innerHTML = JSON.stringify(trucksJSON);
}