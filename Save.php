<?php
  $doc = new DomDocument("1.0");
  $qs = $_GET["xml"];
  $doc->loadXML(stripslashes($qs));
  $doc->save("xml/data.xml");
  //chmod("data.xml",0777);
?>
