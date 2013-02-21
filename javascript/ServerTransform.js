
/*
Student Name: Minh Duc Nguyen
	Student ID: 171001x
	Page: ServerTransform.js
	Main function: 
		- send request data to server to transform XML
		- display returned data under table format 
*/


var xhr = createRequest();
function ServerTransform()
{	
    if(xhr) {
	    xhr.open("POST", "serverTransform.php", true);
	    xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4 && xhr.status == 200) {
				var spantag = document.getElementById("planes");
				spantag.innerHTML = xhr.responseText;
		    } 
	    } 
	    xhr.send(null);
	} 
} 

//clear table before adding new one
function refreshTable() 
{   
    table = document.getElementById("xsltContent");
	 while(table.hasChildNodes())
		{
			table.removeChild(table.firstChild);
		}
}

var xhr2 = createRequest();
function requestTransform(selectedState)
{
	//disable map
	var mapTag = document.getElementById("map");
	mapTag.style.display = "none";
	if(xhr2) 
	{ 		  
		  obj = document.getElementById("xsltContent");
		  //call function to refresh container table
		  refreshTable(obj);
		  
		  var requestbody ="state="+encodeURIComponent(selectedState); 
		  xhr2.open("POST", "serverTransform.php", true); 
		  xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
		  xhr2.onreadystatechange = function() 
		  { 
			 //alert(xhr.readyState); // to let us see the state of the computation 
			   if (xhr2.readyState == 4 && xhr2.status == 200) 
			   { 
					 var reponseText = xhr2.responseText; 					
					 if(reponseText == "false")
					 	alert("The Observation Request does not exist on the BOM server!!!");	
					 if(reponseText == "true")
					 {
						 //call client transform the weather.xml to html to display on client side undertable format
						 //this function come from "javascript/ClientTransform.js"
						 ClientTransform();					
					 }
			   } // end if 
		  } // end anonymous call-back function 
		  xhr2.send(requestbody); 
	} // end if 
}

function requestClearData()
{
	var xhr1 = createRequest();
	if(xhr1) 
	{ 	
		  var requestbody ="clear="+encodeURIComponent("true"); 
		  xhr1.open("POST", "clearData.php", true); 
		  xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
		  xhr1.onreadystatechange = function() 
		  { 
			 //alert(xhr.readyState); // to let us see the state of the computation 
			   if (xhr1.readyState == 4 && xhr1.status == 200) 
			   { 					
					 
			   } // end if 
		  } // end anonymous call-back function 
		  xhr1.send(requestbody); 
	 } // end if 
}

//request to transform and get all station
function requestTransAndGetStations(selectedState)
{
	//clear data.ml file
	requestClearData();
	
	//disable map	
	var mapTag = document.getElementById("map");
	mapTag.style.display = "block";
	if(xhr) 
	{ 		 
		  obj = document.getElementById("xsltContent");
		  //call function to refresh container table
		  refreshTable(obj);
		  
		  var requestbody ="state2="+encodeURIComponent(selectedState)+"&allStation=" + encodeURIComponent("yes"); 
		  xhr.open("POST", "serverTransform.php", true); 
		  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
		  xhr.onreadystatechange = function() 
		  { 
			 //alert(xhr.readyState); // to let us see the state of the computation 
			   if (xhr.readyState == 4 && xhr.status == 200) 
			   { 
					 var reponseText = xhr.responseText; 					
					 if(reponseText == "")
					 	alert("There is no station in this State");	
					 if(reponseText.length != "")
					 {
						 
						 //call function in map.js to clear the markers
						deleteOverlays();						 
						 
						//the return should be a list of stations of the selected State
						//in following format: "station";"maxtemp";"mintempt";"rain9am";"winrun";"shunshine"+++
						//index						0		1			2			3		4		5
						var arr = reponseText.split("++");
						for(var i = 0; i < arr.length - 1; i++)
						{
							var arrInfo = arr[i].split(";");
							
						//navigate to "map.js" file to call "addMultipleMarker" function to load all stations on the Map	
							addMultipleMarker(arrInfo[0],arrInfo[1],arrInfo[2],arrInfo[3],arrInfo[4],arrInfo[5]);	
							
						}					
					 }
					 
					 
			   } // end if 
		  } // end anonymous call-back function 
		  xhr.send(requestbody); 
	 } // end if 
	
	//read markers from data.xml file and dislay all stations
	placeMarkers(); 
}