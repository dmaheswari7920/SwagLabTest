const  playwright  = require('playwright');
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./models/login/login');
const { ProductPage } = require('./models/product/product');
const { SwagSuccessPage } = require('./models/swagsuccess/swagsuccess');

const APP_URL = 'https://www.saucedemo.com/';

const backpack_item = '#add-to-cart-sauce-labs-backpack';
const bikelight_item = '#add-to-cart-sauce-labs-bike-light';

test('Verify the login page - Valid Username and Password as Input', async () => {
	
	const browser = await playwright["chromium"].launch({
		headless : false,
  		args:['--start-maximized']
	});
	
	const context = await browser.newContext({
		viewport: null  // ensure that the viewport uses the entire screen
	});
	const page = await context.newPage()	
	
	const loginPage = new LoginPage(page);
	await loginPage.navigate(APP_URL);
	await loginPage.login('standard_user','secret_sauce');	
   
    const pageUrl = await loginPage.getPageUrl();
    expect(pageUrl).toMatch(/inventory\.html/);     
	  	
});

test('Verify the login page - Invalid Username and Password as Input', async () => {
	
	const browser = await playwright["chromium"].launch({
		headless : false,
  		args:['--start-maximized']
	});
	
	const context = await browser.newContext({
		viewport: null  // ensure that the viewport uses the entire screen
	});	
	const page = await context.newPage()	
	
	const loginPage = new LoginPage(page);
	await loginPage.navigate(APP_URL);
	await loginPage.login('standard_user1','secret_sauce1');
	
	const pageUrl = await loginPage.getPageUrl();
    expect(pageUrl).not.toMatch(/inventory\.html/);   
	  	
});

test('Verify Add to Cart : sauce-labs-items', async () => {
	
	const browser = await playwright["chromium"].launch({
		headless : false,
  		args:['--start-maximized']
	});
	
	const context = await browser.newContext({
		viewport: null  // ensure that the viewport uses the entire screen
	});	
	const page = await context.newPage()	
	
	const loginPage = new LoginPage(page);
	await loginPage.navigate(APP_URL);
	await loginPage.login('standard_user','secret_sauce');	
		
	const productPage = new ProductPage(page);
	
	const cartCountPrev = await productPage.getNoOfItemsInCart();
	consolelog("LOGGING :: saucetest.spec.js :: Items Previous Count::"+cartCountPrev);	   	
	
	await productPage.addToCart(backpack_item);
	await productPage.addToCart(bikelight_item);	
	const cartCountNow = await productPage.getNoOfItemsInCart();
	consolelog("LOGGING :: saucetest.spec.js ::  Items Current Count::"+cartCountNow);
	
	expect(cartCountNow).toEqual(cartCountPrev+2); 
  	await page.click('#contents_wrapper > #header_container > .primary_header > #shopping_cart_container > .shopping_cart_link', {delay:2000});	
  	
  	const pageUrl = await productPage.getPageUrl();
	if (cartCountNow > 0) {
		consolelog("LOGGING :: saucetest.spec.js ::  MAHE MAHE cart 111");   
    	expect(pageUrl).toMatch(/cart\.html/);
    } else {
    	consolelog("LOGGING :: saucetest.spec.js ::  MAHE MAHE cart 22");
     	expect(pageUrl).not.toMatch(/cart\.html/);
    }
});

test('Verify Add to Cart : Empty Cart', async () => {
	
	const browser = await playwright["chromium"].launch({
		headless : false,
  		args:['--start-maximized']
	});
	
	const context = await browser.newContext({
		viewport: null  // ensure that the viewport uses the entire screen
	});	
	const page = await context.newPage()	
	
	const loginPage = new LoginPage(page);
	await loginPage.navigate(APP_URL);
	await loginPage.login('standard_user','secret_sauce');	
		
	const productPage = new ProductPage(page);
	
	const cartCountNow = await productPage.getNoOfItemsInCart();
	consolelog("LOGGING :: saucetest.spec.js ::  Items Current Count::"+cartCountNow);   
	
	await page.click('#contents_wrapper > #header_container > .primary_header > #shopping_cart_container > .shopping_cart_link', {delay:2000});	
	
	const pageUrl = await productPage.getPageUrl();
	if (cartCountNow > 0) {	
    	expect(pageUrl).toMatch(/cart\.html/);
     } else {     
     	expect(pageUrl).not.toMatch(/cart\.html/);
     }
	  	
});

test('Verify Checkout Complete', async () => {
	
	const browser = await playwright["chromium"].launch({
		headless : false,
  		args:['--start-maximized']
	});
	
	const context = await browser.newContext({
		viewport: null  // ensure that the viewport uses the entire screen
	});	
	const page = await context.newPage()	
	
	const loginPage = new LoginPage(page);
	await loginPage.navigate(APP_URL);
	await loginPage.login('standard_user','secret_sauce');	
		
	const productPage = new ProductPage(page);
	
	const cartCountPrev = await productPage.getNoOfItemsInCart();
	consolelog("LOGGING :: saucetest.spec.js :: Items Previous Count::"+cartCountPrev);	   	
	await productPage.addToCart(backpack_item);
	const cartCountNow = await productPage.getNoOfItemsInCart();
	consolelog("LOGGING :: saucetest.spec.js ::  Items Current Count::"+cartCountNow);  
	
	await page.click('#contents_wrapper > #header_container > .primary_header > #shopping_cart_container > .shopping_cart_link', {delay:1000});	
	await page.click('#checkout', {delay:2000});
	await page.type('[name=firstName]','Maheswari');
	await page.type('[name=lastName]','Dhandapani');
	await page.type('[name=postalCode]','641048');
	
	await page.click('#continue', {delay:1000});	
	await page.click('#finish', {delay:1000});
	
	const successPage = new SwagSuccessPage(page);	
	const success = await successPage.getSuccessFlag();
	consolelog("LOGGING :: saucetest.spec.js :: success Flag :: "+success);
	expect(success).toEqual(true);  	
});


function consolelog (text) {	
	//console.log(text);
}

