const { test, expect } = require('@playwright/test');

class ProductPage {
  
  constructor(page) {
    this.page = page;
  }
  
  
  async getPageUrl(){
     return this.page.url();
  }
    
  async addToCart(productName) {
    
  	await this.page.click(productName);
      
  }
  
   async getPageUrl(){
       
     return this.page.url();
   }
   
   async getNoOfItemsInCart(){
    
    const elementByClass = await this.page.$('.shopping_cart_badge');
    let innerText = "";
    let itemsCount = 0;
    
    if (elementByClass == null ) {
    	
    	consolelog("LOGGING :: product.js :: innerText is null");    	
    }  else {
     
     	innerText = await elementByClass.innerText();
     	consolelog("LOGGING :: product.js :: innerText :: "+innerText);   	
      	
	    if (innerText == NaN || innerText  == "") {
	     	itemsCount = 0;
	     	consolelog("LOGGING :: product.js :: innerText if ::  "+innerText);
	    } else {
	     	consolelog("LOGGING :: product.js :: innerText else :: "+innerText);        
	        itemsCount = Number(innerText);
	    } 	     	 
    } 	  	 
  	return Number(itemsCount);   
   }   
  
}

function consolelog (text) {	
	//console.log(text);
} 
module.exports = { ProductPage };