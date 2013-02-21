<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!--
Student Name: Minh Duc Nguyen
	Student ID: 171001x
	Page: wmXML2XML.xsl
	Main function: 
      - convert state weather data into xml format
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<?xml-stylesheet type = "test/xsl" href = "wmXML2HTML.xsl" ?>
<xsl:output method="xml" indent="yes"/>

<xsl:template match="/">
	<markers>    
    <!-- add attribute for markers-->
    <xsl:attribute name="name">
         <xsl:value-of select="//product [@name]/@name" />
    </xsl:attribute>
    
    <!-- declare date variable-->
    <xsl:variable name="localtime" select="//product [@create-time-local]/@create-time-local"/>
    <xsl:variable name="lcDay" select="substring($localtime,7,2)"/>
    <xsl:variable name="lcMonth" select="substring($localtime,5,2)"/>
    <xsl:variable name="lcYear" select="substring($localtime,1,4)"/>
    <xsl:variable name="lcHour" select="substring($localtime,10,2)"/>
    <xsl:variable name="lcMin" select="substring($localtime,12,2)"/>
  
    <xsl:attribute name="date">
        <xsl:value-of select="concat($lcDay,'/',$lcMonth,'/',$lcYear)" />
    </xsl:attribute>
    <xsl:attribute name="time">
        <xsl:value-of select="concat($lcHour,':',$lcMin)" />
    </xsl:attribute>
    
	<xsl:for-each select="/weather-observations/product/group/obs">    
        <marker>
            <xsl:attribute name="station">
            	 <xsl:value-of select="@station" />
            </xsl:attribute>    		
            		
            <xsl:if test="d[@t='tx'] != ''">  
                 <maxtempt>  
                    <xsl:value-of select="d[@t='tx']" />  
                 </maxtempt>   
            </xsl:if>
                      
            <xsl:if test="d[@t='tn'] != ''">  
                 <mintempt>  
                    <xsl:value-of select="d[@t='tn']" />  
                 </mintempt>   
            </xsl:if>  
                             
            <xsl:if test="d[@t='r'] != ''">  
                 <rainto9am>  
                    <xsl:value-of select="d[@t='r']" />  
                 </rainto9am>   
            </xsl:if>
         
            <xsl:if test="d[@t='wr'] != ''">  
                 <windrun>  
                    <xsl:value-of select="d[@t='wr']" />  
                 </windrun>   
            </xsl:if>
          
            <xsl:if test="d[@t='sn'] != ''">  
                 <sunshine>  
                    <xsl:value-of select="d[@t='sn']" />  
                 </sunshine>   
            </xsl:if>         
        </marker>
	</xsl:for-each>    
	</markers>
</xsl:template>

</xsl:stylesheet>