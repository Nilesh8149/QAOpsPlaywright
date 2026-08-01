const {test,expect}=require('@playwright/test');
const { text } = require('node:stream/consumers');

test.describe.configure({mode:"parallel"});

//My Name is Nilesh

test('@Web Browser context Playwright Test',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
     await page.goto("https://www.naukri.com/");
});

test('Page Playwright Test',async ({page})=>
{
    const username =page.locator("#username");
    const password = page.locator("#password");
    const signIn  = page.locator("#signInBtn");
    const title = page.locator(".card-body a");

    //Scenario: Wrong ID and Password and get the error message printed in console
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");   
   console.log (await page.title());
  //await expect(page).toHaveTitle("Google");                                        //Assertion : toHaveTittle
 await username.fill("Nilesh");
 await password.fill("learning");
 await signIn.click();
 console.log (await page.locator("[style*='block']").textContent());          //textContent : user to fetch the error message and tittle of the element
 await expect ( page.locator("[style*='block']")).toContainText('Incorrect');        // Assertion : toContainText


 //Scenario: Enter the correct password and Username and click on Sign In button

 await username.fill("");
 await username.fill("rahulshettyacademy");
 await password.fill("");
 await password.fill("Learning@830$3mK2");
 await signIn.click();

 //After login we need to get the tittle of 1st and 2nd product

//  console.log(await title.first().textContent());                         
//     console.log(await title.nth(1).textContent());

    const allTittle=await title.allTextContents();
    console.log(allTittle);

    
    
    
});   

test('@Web UI Controls',async ({page})=>
{
  const documentLink= page.locator("[href*='documents-request']");

//Scenario is to select value from drop down which is static
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
  const dropDown = page.locator("select.form-control");
  await dropDown.selectOption("Consultant");                              //selectOption("Given Value name") : It is uesed to select value from dropdown
 
 //Scenario is to click on another checkbox
   await page.locator(".customradio").last().click();
   await page.locator("#okayBtn").click();

 //Scenario is to see whether radio button is check or not by applying asseration
   
     await expect(page.locator(".customradio").last()).toBeChecked();                //toBeChecked(): It is an asseration to validated whether radiobutton is check or not
  //await page.pause();                                                      // page.pause: It is used to paused the windown or code

 //Scenario is we need to check and uncheck the checkbox and apply asseration

  await page.locator("#terms").click();
  expect(page.locator("#terms")).toBeChecked();

  await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    

 //Scenario : Verify if the link is blinking is not
 await expect(documentLink).toHaveAttribute("class","blinkingText");     //Asseration:toHaveAttribute("name","Value")


});

//Scenario: Handind Child window & Tab bu switching browser context

test('childWindow handling',async({browser})=>
{
    const context =await browser.newContext();
     const page= await context.newPage();
     const documentLink= page.locator("[href*='documents-request']");
     const username =page.locator("#username");

 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

 const[newPage]= await Promise.all([                                    //Promise.all
 context.waitForEvent('page'),                                          //waitForEvent('page')
   documentLink.click(),]);

      const text=await newPage.locator(".im-para.red").textContent();
    
  console.log(text);

  //Scenario: To get domain name from returning text by using spilt function

     const arrayText=text.split("@");
     const domainName = arrayText[1].split(" ")[0];
     console.log(domainName);

     await page.bringToFront();                                           //bringToFront(): To bring parent page to front 

      await username.fill(domainName);

console.log(await username.inputValue());





 
     
     




});