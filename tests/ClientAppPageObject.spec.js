const { test, expect } = require('@playwright/test');
const { POManger } = require('../pageobjects/POManger');

const { customtest } = require('../utils/test-base');

//json-->String-->js object

const dataSet = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));


for (const data of dataSet) {
  test(`@web Page Playwright Test ${data.productName}`, async ({ page }) => {




    const poManger = new POManger(page);



    const loginPage = poManger.getLoginPage();

    await loginPage.goto();
    await loginPage.validLogin(data.username, data.password);



    const dashboardPage = poManger.getDashBoardPage();

    console.log(await page.title());
    await dashboardPage.searchProductAddToCart(data.productName);
    await dashboardPage.navigateToCart();



    await page.locator("div li").first().waitFor();
    const bool = await page.locator(`h3:has-text('${data.productName}')`).isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();

    const dropdownCount = await dropdown.locator("button").count();
    for (let i = 0; i < dropdownCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
        await dropdown.locator("button").nth(i).click();
        break;
      }

    }

    // Apply assertion on email id
    //const emailid = "nileshadole963@gmail.com";

    await expect(page.locator(".details__user label")).toHaveText(data.username);

    await page.locator("a.btnn").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator("td.em-spacer-1 .ng-star-inserted").textContent();

    console.log(orderId);

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    //Need to confirm if order is place

    const row = await page.locator("tbody tr");
    const rowCount = await row.count();



    for (let i = 0; i < rowCount; ++i) {
      const rowOrderID = await row.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderID)) {
        await row.nth(i).locator("button").first().click();
        break;
      }
    }



    //await page.pause();

  });
}   ;

  

   


customtest(`Page Playwright Test`, async ({ page, testDataForOrder }) => {




  const poManger = new POManger(page);



  const loginPage = poManger.getLoginPage();

  await loginPage.goto();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);



  const dashboardPage = poManger.getDashBoardPage();

  console.log(await page.title());
  await dashboardPage.searchProductAddToCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  console.log("*************")
});