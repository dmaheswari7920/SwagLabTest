const { test, expect } = require('@playwright/test');

class LoginPage {
  
  constructor(page) {
    this.page = page;
  }
  
  async navigate(appUrl) {
    await this.page.goto(appUrl);
  }
  
  async getPageUrl(){
     return this.page.url();
  }
    
  async login(username, password) {
  
  	await this.page.type('[name=user-name]',username);
	await this.page.type('[name=password]',password);	
	await this.page.keyboard.press('Enter',{delay:2000});	
      
  } 
  
  
}

module.exports = { LoginPage };