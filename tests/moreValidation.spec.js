const {test,expect}=require('@playwright/test');

test('Popup Validation',async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");

    // await page.goBack();
    // await page.goForward();

    //Scenario: Need to verify that textbox is visible or hindle by applying asseration

     await expect(page.locator("#displayed-text")).toBeVisible();
     await page.locator("#hide-textbox").click();
     await expect(page.locator("#displayed-text")).toBeHidden();

     //Scenario: Handling Dialog or popup in playwright
   

        page.on('dialog', async dialog => {
    console.log(dialog.type());
    console.log(dialog.message());

    await dialog.accept();

    
})

       await page.locator("#confirmbtn").click();

    

    //Scenario: hover action

    await page.locator("#mousehover").hover();

    //Scenario: Handling Frame

    const framePage=  page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href='lifetime-access']:visible").click();
       const subcribtion= await  framePage.locator("div.content-side h2").textContent();
       console.log(subcribtion.split(" ")[1]);


   // await page.pause();




})