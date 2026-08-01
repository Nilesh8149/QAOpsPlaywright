const {test,expect}=require('@playwright/test');


test('Page Playwright Test',async ({page})=> 
{   
   
    const productName="ZARA COAT 3";
    const product= page.locator(".card-body");
    const username =page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signIn  = page.locator("#login");
    

     
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");   
   console.log (await page.title());

                                        
 await username.fill("nileshadole963@gmail.com");
 await password.fill("123@Nilesh");
 await signIn.click();

                                                         // wait type : waitForLoadState('networkidle')
    
 //await page.waitForLoadState('networkidle');
 await  page.locator(".card-body b").first().waitFor();
  
console.log (await page.locator(".card-body b").allTextContents());
  
const count =await product.count();

 for(let i=0;i<count;++i)
 {
    if (await product.nth(i).locator("b").textContent()===productName)
    {
        await product.nth(i).locator("text= Add To Cart").click();

        break;
    }
 };
 
 await page.locator("[routerlink='/dashboard/cart']").click();

 await page.locator("div li").first().waitFor();
 const bool= await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();
  await page.locator("[placeholder='Select Country']").pressSequentially("ind");
  const dropdown=await page.locator(".ta-results");
  await dropdown.waitFor();

  const dropdownCount=await dropdown.locator("button").count();
  for(let i=0;i<dropdownCount;++i)
  {
    const text=await dropdown.locator("button").nth(i).textContent();
    if(text === " India")
    {
      await dropdown.locator("button").nth(i).click();
      break;
    }

  }

  // Apply assertion on email id
const emailid ="nileshadole963@gmail.com";

await expect( page.locator(".details__user label")).toHaveText(emailid);

await page.locator("a.btnn").click();

await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

const orderId=await page.locator("td.em-spacer-1 .ng-star-inserted").textContent();

console.log(orderId);

await page.locator("button[routerlink='/dashboard/myorders']").click();

//Need to confirm if order is place

 const row=await page.locator("tbody tr");
 const rowCount=await row.count();



for(let i=0;i<rowCount;++i)
{
  const rowOrderID=await row.nth(i).locator("th").textContent();
  if(orderId.includes(rowOrderID))
  {
    await row.nth(i).locator("button").first().click();
    break;
  }
}
 


//await page.pause();
    
});    