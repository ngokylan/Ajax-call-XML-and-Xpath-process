<?xml version="1.0" encoding="iso-8859-1"?><!-- DWXMLSource="planes.xml" -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!--
Student Name: Minh Duc Nguyen
	Student ID: 171001x
	Page: wmXML2THML.xsl
	Main function: 
      - convert "xml/weatherMap.xml" into html format and display on Browser
-->

<xsl:output method="html"/>
<xsl:template match="/">

	<table width="100%" id="tblContent">
    <tr>
    	<td>
        	<span style="font-weight:bold">Caption: </span><xsl:value-of select="/markers [@name]/@name" /><span style="font-weight:bold"> Local Time: </span><xsl:value-of select="/markers [@time]/@time" /><span style="font-weight:bold"> Date: </span> <xsl:value-of select="/markers [@date]/@date" />
        </td>
    </tr>
    <tr>
    	<td>
            <table width="100%" border="1" id="markerTable">
            <tr>
            <td>
                <table width="100%">
                <tr class="title">
                    <td>Station</td>
                    <td>Max Temperature</td>
                    <td>Min Temperature</td>
                    <td>Rain to 9am (mm)</td>
                    <td>Wind Run (km/hr)</td>
                    <td>Sunshine (hr)</td>
                </tr>
             
                <xsl:for-each select="markers/marker">
                <tr>
                	<xsl:if test="position() mod 2 = 1">
                        <xsl:attribute name="class">highlight</xsl:attribute>        
                    </xsl:if> 
                    <td>
                    <xsl:element name="a">
                    	<xsl:attribute name="href">#</xsl:attribute>
                        <xsl:attribute name="onclick">
                        loadMapLocation('<xsl:value-of select="@station" />', '<xsl:value-of select="maxtempt" />',' <xsl:value-of select="mintempt" />', '<xsl:value-of select="rainto9am" />','<xsl:value-of select="windrun" />','<xsl:value-of select="sunshine" />')
                        </xsl:attribute>
                        <xsl:value-of select="@station" />
                    </xsl:element>                   
                    </td>
                    <td>
                    <xsl:if test="maxtempt != ''">
                         <xsl:value-of select="maxtempt" />           
                    </xsl:if> 
                    <xsl:if test="not(maxtempt)">  
                         <xsl:text>&#xA0;</xsl:text>          
                    </xsl:if>
                    <xsl:if test="maxtempt &gt; 0">  
                         <xsl:text>&#xA0;</xsl:text>          
                    </xsl:if>
                    </td>
                    <td>
                    <xsl:if test="mintempt != ''">
                         <xsl:value-of select="mintempt" />           
                    </xsl:if> 
                    <xsl:if test="not(mintempt)">  
                         <xsl:text>&#xA0;</xsl:text>          
                    </xsl:if>
                    <xsl:if test="mintempt &gt; 0">  
                         <xsl:text>&#xA0;</xsl:text>          
                    </xsl:if>
                    </td>
                    <td>
                    <xsl:if test="rainto9am != ''">
                         <xsl:value-of select="rainto9am" />           
                    </xsl:if>   
                    <xsl:if test="not(rainto9am)">  
                         <xsl:text>&#xA0;</xsl:text>          
                    </xsl:if>
                    <xsl:if test="rainto9am &gt; 0">  
                         <xsl:text>&#xA0;</xsl:text>          
                    </xsl:if>
                    </td>
                    <td>
                    <xsl:if test="windrun != ''">
                         <xsl:value-of select="windrun" />           
                    </xsl:if>     
                    <xsl:if test="not(windrun)">  
                         <xsl:text>&#xA0;</xsl:text>          
                    </xsl:if>
                    <xsl:if test="windrun &gt; 0">  
                         <xsl:text>&#xA0;</xsl:text>          
                    </xsl:if>
                   </td>
                    <td>
                    <xsl:if test="sunshine != ''">
                         <xsl:value-of select="sunshine" />         
                    </xsl:if>      
                    <xsl:if test="not(sunshine)">  
                         <xsl:text>&#xA0;</xsl:text>          
                    </xsl:if>
                    <xsl:if test="sunshine &gt; 0">  
                         <xsl:text>&#xA0;</xsl:text>          
                    </xsl:if>
                    </td>
                </tr>					
                </xsl:for-each>
                </table>
            </td>
            </tr>
            </table>
        </td>        
    </tr>
    	
    </table>
</xsl:template>

</xsl:stylesheet>