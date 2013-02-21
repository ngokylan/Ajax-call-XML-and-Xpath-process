
/*
Student Name: Minh Duc Nguyen
	Student ID: 171001x
	Page: xhr.js
	Main function: 
      - create ajax request
*/


// file xhr.js
// create and return an XMLHttpRequest object for Firefox or IE
 function createRequest() {
    var xhr = false;  
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
} // end function createRequest()
