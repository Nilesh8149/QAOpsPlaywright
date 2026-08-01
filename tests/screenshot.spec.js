const { test, expect } = require('@playwright/test');

test('Popup Validation', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
     

    //Scenario: Need to verify that textbox is visible or hindle by applying asseration

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'screenshotpart2.png'});
    await page.locator("#hide-textbox").click();
     await page.screenshot({path:'screenshotpart1.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test('Visual testing',async({page})=>
{
    await page.goto('https://www.google.com/');
  expect(await page.screenshot()).toMatchSnapshot('landing.png');
}
)