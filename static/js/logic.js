var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations) {

  // Create the tile layer that will be the background of our map.
  var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object to hold the lightmap layer.
  var baseMaps = {
    "Street": streetMap
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
    "BikeStations": bikeStations
  };


  // Create the map object with options.
  var myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [streetMap, bikeStations]
  });


  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
};

  // Create the createMarkers function.
function createMarkers(response){
    // Pull the “stations” property from response.data.
    var stations = response.data.stations;
    
    console.log(stations);
    console.log(stations[0]);
    console.log(stations.length);
    // Initialize an array to hold the bike markers.
    var bikeMarkers = [];
    // Loop through the stations array.
    for (var i=0; i<stations.length; i++){
      console.log(stations[0].lat);
      // For each station, create a marker, and bind a popup with the station’s name.
      bikeMarkers.push(
        L.marker([stations[i].lat, stations[i].lon]).bindPopup("<h3>" + stations[i].name + "</h3>")
      );
    }
    // Add the marker to the bikeMarkers array.
    var bikeLayer = L.layerGroup(bikeMarkers);
    // Create a layer group that’s made from the bike markers array, and pass it to the createMap function.
    createMap(bikeLayer);

};
  
  
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
 d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(function(response){
   //console.log(response);
   createMarkers(response);
 }); 



