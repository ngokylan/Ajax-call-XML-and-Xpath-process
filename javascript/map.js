
/*
Student Name: Minh Duc Nguyen
	Student ID: 171001x
	Page: map.js
	Main function: 
      - create google Map connection
	  - add marker to google Map
	  - remove marker from google Map
	  - place marker on google map
*/


var map = null; 
var geocoder = null;
var xhr1 = null;

xhr1 = GXmlHttp.create();//createRequest();
geocoder = new GClientGeocoder();

var mashupInfo = "";
var marker = new Array();
var markersArray = [];

var address = "";

function loadMap(stationName , markerInfo)
{
	address = stationName;
	//alert(address);
	marker = markerInfo;
	load();
}

// function to load the map and saved markers; executed when system loads up
function load() {
	if (GBrowserIsCompatible()) 
	{
		// create map mapContainer
		var mapTag = document.getElementById("map");
		
		map = new GMap2(mapTag);
		
		// add controls
		map.addControl(new GSmallMapControl());
		map.addControl(new GMapTypeControl());
        
		// place the markers saved from last time
		// If there are none, the map will center on Paris
		//addMarker();		
		geocoder.getLatLng("Paris", function(point){map.setCenter(point, 13)});
   }
}


function addMultipleMarker(station, maxtempt, mintempt, rainto9am, windrun, sunshine)
{	
	var info = "";
	info +=  "<div align='center'><font style='font-weight: bold;'>" + station + "</font></div>";
	if(maxtempt != "" && parseFloat(maxtempt) > 0.0)
	info +=  "<div><font style='font-weight: bold;'>Max Temperature: </font>" + maxtempt + " Celsius</div>";
	if(mintempt != "" && parseFloat(mintempt) > 0.0)
	info +=  "<div><font style='font-weight: bold;'>Min Temperature: </font>" +mintempt + " Celsius</div>";
	if(rainto9am != "" && parseFloat(rainto9am) > 0.0)
	info +=  "<div><font style='font-weight: bold;'>Rain To 9 AM: </font>" + rainto9am + " millimetres</div>";
	if(windrun != "" && parseFloat(windrun) > 0.0)
	info +=  "<div><font style='font-weight: bold;'>Wind Run: </font>" + windrun + " km/hr</div>";
	if(sunshine != "" && parseFloat(sunshine) > 0.0)
	info +=  "<div><font style='font-weight: bold;'>Sun Shine: </font>" + sunshine + " hours</div>";
			
	// convert address to GLatLng, center the map there, and place marker
	geocoder.getLatLng(station, function(point) {
		if (!point) {
			//alert(address + " not found");
		} 
		else{
			map.setCenter(point, 6);
			
			var marker = createMarker(point, info);
			map.addOverlay(marker);
			//marker.openInfoWindowHtml(address);
			saveMarker(point, address);
		}
	});
}

// function to add a marker to the disdplayed map, based on address in input field
function addMarker(stationName , markerInfo)
{
	address = stationName;
	//alert(address);
	marker = markerInfo;
	//marker info
	var info = "";
	info +=  "<div align='center'><font style='font-weight: bold;'>" + address + "</font></div>";
	if(marker[0] != "" && parseFloat(marker[0]) > 0.0)
	info +=  "<div><font style='font-weight: bold;'>Max Temperature: </font>" + marker[0] + " Celsius</div>";
	if(marker[1] != "" && parseFloat(marker[1]) > 0.0)
	info +=  "<div><font style='font-weight: bold;'>Min Temperature: </font>" + marker[1] + " Celsius</div>";
	if(marker[2] != "" && parseFloat(marker[2]) > 0.0)
	info +=  "<div><font style='font-weight: bold;'>Rain To 9 AM: </font>" + marker[2] + " millimetres</div>";
	if(marker[3] != "" && parseFloat(marker[3]) > 0.0)
	info +=  "<div><font style='font-weight: bold;'>Wind Run: </font>" + marker[3] + " km/hr</div>";
	if(marker[4] != "" && parseFloat(marker[4]) > 0.0)
	info +=  "<div><font style='font-weight: bold;'>Sun Shine: </font>" + marker[4] + " hours</div>";
	//alert(marker);
	// convert address to GLatLng, center the map there, and place marker
	geocoder.getLatLng(address, function(point) {
		if (!point) {
			alert(address + " not found");
		} 
		else{
			map.setCenter(point, 13);
			
			var marker = createMarker(point, info);
			map.addOverlay(marker);
			marker.openInfoWindowHtml(info);
			//saveMarker(point, address);
		}
	});
}

// function to save the details of a marker at a particular point, with a particular address
// calls a PHP file to do the actual work, using Ajax
function saveMarker(point, address){
	var lat = point.y; var lng = point.x;
	var url = "saveMarkers.php?lat=" + lat + "&lng=" + lng + "&address=" + address;
	xhr1.open("GET", url, true); 
	xhr1.onreadystatechange = getConfirm;  
	//xhr1.setRequestHeader("Content-Type", "text/xml" ); //use this if no response required 
	xhr1.send(null); 
}

// function to place marker added confirmation message in document
// runs as call-back when a new marker has been added successfully
function getConfirm(){
	if ((xhr1.readyState == 4) &&(xhr1.status == 200))    {
        var markerAddConfirm = xhr1.responseText;
		//alert(markerAddConfirm);
   }
}

// function to connect with server and read marker data from file data.xml
// Connection is via the Google GDownloadUrl function, which is passed the data file as
// first parameter, and a call-back function as second parameter
// The data downloaded is passed to this call-back as the first parameter, and the response code
// from teh download is passed as the second parameter
function placeMarkers(){
    GDownloadUrl("data.xml", function(data, responseCode) {
        if(responseCode == 200){  // data loaded ok
              var xml = GXml.parse(data);  //convert the data to an XML DOM fragment; warning: will get from cache if not cleared
              var markers = xml.documentElement.getElementsByTagName("marker"); // get the marker elements in the data
			  if (markers.length == 0) {// if no markers, set map center on Paris
			  
              	  geocoder.getLatLng(address, function(point){map.setCenter(point, 6)});
			  }
			  else { // place the markers
              	for (var i = 0; i < markers.length; i++) {
				 	var point = new GLatLng(parseFloat(markers[i].getAttribute("lat")), parseFloat(markers[i].getAttribute("lng")));
                 	map.setCenter(point, 6);   //fails if this not used
									
                 	map.addOverlay(createMarker(point, markers[i])); 
              	}
			 }
        }
		else if(responseCode == -1) {
              alert("Data request timed out. Please try later.");
		}
        else { // center the map on Paris 
              geocoder.getLatLng("Paris", function(point){map.setCenter(point, 13)});
		}
		});
}

// function to create a new marker with click-ope information window for a given point with given name
function createMarker(point, name) { 
	var marker = new GMarker(point); 
    GEvent.addListener(marker, "click", function() { 
    	marker.openInfoWindowHtml(name); 		
         }); 	
	markersArray.push(marker);
	return marker; 
} 

// Deletes all markers in the array by removing references to them
function deleteOverlays() {
  	map.clearOverlays();
	
}
