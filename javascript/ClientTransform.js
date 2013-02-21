
/*
Student Name: Minh Duc Nguyen
	Student ID: 171001x
	Page: ClientTransform.js
	Main function: 
      - Transform XML to HTML using xsl
*/

// XSLT transform for Firefox and IE
function ClientTransform()
{

	if (window.XSLTProcessor)
	{		
		var xsltProc = new XSLTProcessor();
		
		// Load XSL
		xslSS = document.implementation.createDocument("", "doc", null);
		xslSS.async = false;
		xslSS.load("wmXML2HTML.xsl");
		xsltProc.importStylesheet(xslSS);
		
		// Load XML
		var xmlDoc = document.implementation.createDocument("", "doc", null);
		xmlDoc.async = false;
		xmlDoc.load("xml/weatherMap.xml");
		
		
		// Transform
		var fragment = xsltProc.transformToFragment(xmlDoc, document);
		
		//clear the old table first
		var oTable=document.getElementById("xsltContent"); 
		while(oTable.childNodes.length>2) 
		oTable.removeChild(oTable.lastChild); 
		
		// Save to weatherMap.xml file
		oTable.appendChild(fragment);
	}
	else if (window.ActiveXObject)
	{
		
		// Load XML
		var xml = new ActiveXObject("Microsoft.XMLDOM");
		xml.async = false;
		xml.load("xml/weatherMap.xml");
		
		// Load XSL
		var xsl = new ActiveXObject("Microsoft.XMLDOM");
		xsl.async = false;
		xsl.load("wmXML2HTML.xsl");
		
		// Transform
		var fragment = xml.transformNode(xsl);
		
		// Insert into web page
		document.getElementById("xsltContent").appendChild(fragment);
	}
	else // neither
		alert ("Neither");
}