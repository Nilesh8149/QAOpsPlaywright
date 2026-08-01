const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { POManger } = require('../../pageobjects/POManger');
const playwright = require('@playwright/test');

Given('the user is on login page', async function () {
 

  this.loginPage = this.poManger.getLoginPage();
  await this.loginPage.goto()




});

When('the user enter the valid {string} and {string} and click on login button', async function (username, password) {

  await this.loginPage.validLogin(username, password);
});

Then('user must redirect to Dashboard page', async function () {


  console.log(await this.page.title());

  await expect(this.page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");

});

Given('a login to Ecommerance2 appilcation with {string} and {string}', async function (username1, password1) {
  const username = this.page.locator("#username");
  const password = this.page.locator("#password");
  const signIn = this.page.locator("#signInBtn");

  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await this.page.title());
  //await expect(page).toHaveTitle("Google");                                        //Assertion : toHaveTittle
  await username.fill(username1);
  await password.fill(password1);
  await signIn.click();
});

Then('validate the error message', async function () {
  console.log(await this.page.locator("[style*='block']").textContent());          //textContent : user to fetch the error message and tittle of the element
  await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});