<?php
	
/*
Student Name: Minh Duc Nguyen
	Student ID: 171001x
	Page: saveMarkers.js
	Main function: 
      - save marker lat and lng into data.xml file
*/

	$url = 'data.xml';
	$lat  = $_GET['lat'];
	$lng  = $_GET['lng'];
	$address  = $_GET['address'];
	
	// create new DOM document
	$doc = new DomDocument();
	
	// if marker file does not exist, set up the DOM document with markers node but no marker nodes
	if (file_exists($url)){
		$node = $doc->createElement('markers');
		$newnode  = $doc->appendChild($node);
	}
	// else read the DOM document from the XML file
	else {
		$doc->preserveWhiteSpace = FALSE; 
		$doc->load($url);   
	}
	
	// select the markers element
	$markerselements = $doc->getElementsByTagName('markers')->item(0);
	
	
	// create a new marker element from the data passed in
	// and append it to the end of the list of existing marker elements
	$newmarker = $doc->createElement('marker');
	$newmarker = $markerselements->appendChild($newmarker);   
	$newmarker->setAttribute("lat", $lat);
	$newmarker->setAttribute("lng", $lng);
	$newmarker->setAttribute("address", $address);

	// save the updated XML to the XML file, and send message back to the client
	$doc->formatOutput = true;
	$strConfirm = "Marker added for ".$address;
	$doc->save($url);
	  
	echo ($strConfirm);

?>





