<?php
	
/*
Student Name: Minh Duc Nguyen
	Student ID: 171001x
	Page: clearData.php
	Main function: 
      - clear data.xml file
*/

	if(isset($_POST["clear"]))
	{
		$url = 'data.xml';
		// create new DOM document
		$doc = new DomDocument('1.0');	
		$node = $doc->createElement('markers');
		$markers = $doc->createTextNode("");
		$node  = $doc->appendChild($node);
		$node->appendChild($markers);
		
		// save the updated XML to the XML file, and send message back to the client	
		$doc->formatOutput = true;	
		$strConfirm = "Marker is clear";
		$doc->save($url);
		
		echo $strConfirm;
	}
	

?>





