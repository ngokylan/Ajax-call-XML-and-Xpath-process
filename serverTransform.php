<?php

/*
Student Name: Minh Duc Nguyen
	Student ID: 171001x
	Page: serverTransform.php
	Main function: 
      - get state weather info from server
	  - load wmXML2XML.xsl template
	  - transform and store into "xml/weatherMap.xml" file
*/
    
	$bomFileExists = false;
	function transXML($state)
	{
		$BOMserverFile = "";
		if($state == "Victoria")
		 	$BOMserverFile = "ftp://ftp2.bom.gov.au/anon/gen/fwo/IDV65176.xml";
		if($state == "Northern Territory")
		 	$BOMserverFile = "ftp://ftp2.bom.gov.au/anon/gen/fwo/IDD65176.xml";
		if($state == "New South Wales")
		 	$BOMserverFile = "ftp://ftp2.bom.gov.au/anon/gen/fwo/IDN65176.xml";
		if($state == "South Australia")
		 	$BOMserverFile = "ftp://ftp2.bom.gov.au/anon/gen/fwo/IDS65176.xml";
		if($state == "Tasmania")
		 	$BOMserverFile = "ftp://ftp2.bom.gov.au/anon/gen/fwo/IDT65176.xml";
		if($state == "Western Australia")
		 	$BOMserverFile = "ftp://ftp2.bom.gov.au/anon/gen/fwo/IDW65176.xml";
		if($state == "Queensland")
		 	$BOMserverFile = "ftp://ftp2.bom.gov.au/anon/gen/fwo/IDQ65176.xml";
			
		$bomFileExists = false;
		if (file_exists($BOMserverFile)) 
		{
			$xmlDoc = new DOMDocument('1.0');     
			$xmlDoc->formatOutput = true;     
			$xmlDoc->load($BOMserverFile);    
			
			$xslDoc = new DomDocument;     
			$xslDoc->load("wmXML2XML.xsl");   
			 
			$proc = new XSLTProcessor;    
			$proc->importStyleSheet($xslDoc);    
			
			$strXml= $proc->transformToXML($xmlDoc); 
			
			
			$xmlWeatherMap = new DOMDocument('1.0');   
			
			$fp = fopen("xml/weatherMap.xml","w");
			fputs($fp,$strXml);
			fclose($fp); 
			$bomFileExists = "true";	
		} 
		else 
		{
			$bomFileExists = "false";		// on client site, it will display error msg "The Observation Request does not exist on the BOM server!!!"
		}
		return $bomFileExists;
	}
	
	if(isset($_POST["state"]))
	{
		 $state = $_POST["state"];		
		 echo transXML($state);			
		
	}
	
	if(isset($_POST["state2"]) && isset($_POST["allStation"]))
	{
		$state = $_POST["state2"];		
		if(transXML($state) == true)
		{	
		
			//read from saved xml file to get station list
			$xmlFile = "xml/weatherMap.xml";  
			$xmldocument = new DOMDocument('1.0');
			$xmldocument->load($xmlFile);
	
			$queryResult = $xmldocument->getElementsByTagName("marker"); 
			$stationList = "";
			foreach ($queryResult as $result) 
			{				
				$stationList .= $result->getAttribute('station') . " " . $state . ";"; 
				
				$maxTempt = $result->getElementsByTagName('maxtempt')->item(0)->nodeValue;
				$mintempt = $result->getElementsByTagName('mintempt')->item(0)->nodeValue;
				$rainto9am = $result->getElementsByTagName('rainto9am')->item(0)->nodeValue;
				$windrun = $result->getElementsByTagName('windrun')->item(0)->nodeValue;
				$sunshine = $result->getElementsByTagName('sunshine')->item(0)->nodeValue;	
				
				if($maxTempt != "")		
					$stationList .= $maxTempt . ";";
				else
					$stationList .= " ";
				if($mintempt != "")		
					$stationList .= $mintempt . ";";
				else
					$stationList .= " ";
				if($rainto9am != "")		
					$stationList .= $rainto9am . ";";
				else
					$stationList .= " ";
				if($windrun != "")		
					$stationList .= $windrun . ";";
				else
					$stationList .= " ";
				if($sunshine != "")		
					$stationList .= $sunshine . ";";
				else
					$stationList .= " ";
				
				$stationList .= "++";
			}
			
			echo $stationList;
		}
	}
?>
