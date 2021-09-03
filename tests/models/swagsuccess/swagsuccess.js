const { test, expect } = require('@playwright/test');

class SwagSuccessPage {
  
  constructor(page) {
    this.page = page;
  }
  
  
   async getPageUrl(){
       
     return this.page.url();
   }
	
   async getSuccessFlag(){       
    
    //const elementByClass = await this.page.$('.complete-text');
    const elementByClass = await this.page.locator('.complete-header');    
    let innerText = "";
    let itemsCount = 0;
    let sucessMessage = false;    
    if (elementByClass == null ) {
    	
    	consolelog("LOGGING :: swagsuccess.js :: innerText is null");    	
    }  else {
     
     	innerText = await elementByClass.innerText();
     	consolelog("LOGGING :: swagsuccess.js :: innerText :: "+innerText);   	
      	
	    if (innerText  == "THANK YOU FOR YOUR ORDER") {	     	
	    	sucessMessage = true;
	     	consolelog("LOGGING :: swagsuccess.js :: innerText if ::  "+innerText);
	    } else {
	     	consolelog("LOGGING :: swagsuccess.js :: innerText else :: "+innerText);        
	        sucessMessage = false;
	    } 	     	 
    } 	  	 
    
  	return sucessMessage;
   }   

 
}

function consolelog (text) {	
	//console.log(text);
} 
	

module.exports = { SwagSuccessPage };