const { Before, After, BeforeStep, AfterStep,Status } = require('@cucumber/cucumber');
const { POManger } = require('../../pageobjects/POManger');
const playwright = require('@playwright/test');


Before(async function () {

    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await browser.newPage();
    this.poManger = new POManger(this.page);

})
After(async function(){
    console.log("I am the last to executed")

})

AfterStep(async function({result})
{
    if(result.status ===Status.FAILED)
    {
       await this.page.screenshot({path:'screenshot1.png'}) ;
    }
    
})