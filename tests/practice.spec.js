const{test,expect}=require('@playwright/test');

test ('PracticeTest',async({browser})=>
{
   const context= await browser.newContext();
   const page=await context.newPage();

   //Login
   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

   const username=page.locator("#userEmail");
   const password=page.locator("#userPassword");

   await username.fill("nileshadole963@gmail.com");
   await password.fill("123@Nilesh");
   await page.locator("#login").click();

   page.on('request',request=>console.log(request.url()));
   page.on('response',Response=>console.log(Response.url(),Response.status()));

   //Getting all product Name

  await page.locator(".card-body b").first().waitFor();
  console.log( await page.locator(".card-body b").allTextContents());

  //Need to add Zara Coat to add to cart

  const productName="ZARA COAT 3";
  const product=await page.locator(".card-body");
  const productCount= await product.count();

  for(let i=0;i<productCount;++i)
  {
     if( await product.nth(i).locator("b").textContent()===productName)
     {
        await product.nth(i).locator("text= Add To Cart").click();
        break;
     }
  }

 //Need to click Add to card button and verify whether zara coat 3 is present

 await page.locator("[routerlink*='cart']").click();
  const bool=await page.locator("div .cart h3").isVisible();
  console.log(await page.locator("div .cart h3").textContent() );
  expect(bool).toBeTruthy();

  //Need to click on check out

  await page.locator("text=Checkout").click();

  //Need to select india from dynamic dropdown

  await page.locator("[placeholder*='Country']").pressSequentially("ind");
 const dropDown= await page.locator(".ta-results");
 await dropDown.waitFor();
 const buttonCount=await dropDown.locator("button").count();
const button=await dropDown.locator("button");
 for (let i=0;i<buttonCount;++i)
 {
    if(await button.nth(i).textContent()===" India")
    {
        await button.nth(i).click();
        break;
    }
 }

  


 //await page.pause();

});