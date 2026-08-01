# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UIBasicstest.spec.js >> @Web UI Controls
- Location: tests\UIBasicstest.spec.js:52:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#terms')
    - locator resolved to <input id="terms" name="terms" type="checkbox"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    52 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - link "Free Access to InterviewQues/ResumeAssistance/Material" [ref=e3] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/documents-request
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e4] [cursor=pointer]:
      - /url: https://techsmarthire.com/
  - generic [ref=e5]:
    - heading [level=3] [ref=e6]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: "Username:"
        - textbox "Username:" [ref=e17]
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]
      - generic [ref=e22]:
        - generic [ref=e23] [cursor=pointer]:
          - text: Admin
          - radio "Admin" [ref=e24]
        - generic [ref=e26] [cursor=pointer]:
          - text: User
          - radio "User" [checked] [ref=e27]
      - combobox [ref=e30]:
        - option "Student"
        - option "Teacher"
        - option "Consultant" [selected]
      - generic [ref=e31]:
        - generic [ref=e32]:
          - checkbox "I Agree to the terms and conditions" [ref=e34]
          - generic [ref=e35]:
            - text: I Agree to the
            - link "terms and conditions" [ref=e36] [cursor=pointer]:
              - /url: "#"
        - button "Sign In" [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
  - generic [ref=e43]:
    - paragraph [ref=e45]: You will be limited to only fewer functionalities of the app. Proceed?
    - generic [ref=e46]:
      - button "Cancel" [ref=e47] [cursor=pointer]
      - button "Okay" [active] [ref=e48] [cursor=pointer]
```

# Test source

```ts
  1   | const {test,expect}=require('@playwright/test');
  2   | const { text } = require('node:stream/consumers');
  3   | 
  4   | test.describe.configure({mode:"parallel"});
  5   | 
  6   | test('@Web Browser context Playwright Test',async ({browser})=>
  7   | {
  8   |     const context = await browser.newContext();
  9   |     const page = await context.newPage();
  10  |      await page.goto("https://www.naukri.com/");
  11  | });
  12  | 
  13  | test('Page Playwright Test',async ({page})=>
  14  | {
  15  |     const username =page.locator("#username");
  16  |     const password = page.locator("#password");
  17  |     const signIn  = page.locator("#signInBtn");
  18  |     const title = page.locator(".card-body a");
  19  | 
  20  |     //Scenario: Wrong ID and Password and get the error message printed in console
  21  |    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");   
  22  |    console.log (await page.title());
  23  |   //await expect(page).toHaveTitle("Google");                                        //Assertion : toHaveTittle
  24  |  await username.fill("Nilesh");
  25  |  await password.fill("learning");
  26  |  await signIn.click();
  27  |  console.log (await page.locator("[style*='block']").textContent());          //textContent : user to fetch the error message and tittle of the element
  28  |  await expect ( page.locator("[style*='block']")).toContainText('Incorrect');        // Assertion : toContainText
  29  | 
  30  | 
  31  |  //Scenario: Enter the correct password and Username and click on Sign In button
  32  | 
  33  |  await username.fill("");
  34  |  await username.fill("rahulshettyacademy");
  35  |  await password.fill("");
  36  |  await password.fill("Learning@830$3mK2");
  37  |  await signIn.click();
  38  | 
  39  |  //After login we need to get the tittle of 1st and 2nd product
  40  | 
  41  | //  console.log(await title.first().textContent());                         
  42  | //     console.log(await title.nth(1).textContent());
  43  | 
  44  |     const allTittle=await title.allTextContents();
  45  |     console.log(allTittle);
  46  | 
  47  |     
  48  |     
  49  |     
  50  | });   
  51  | 
  52  | test('@Web UI Controls',async ({page})=>
  53  | {
  54  |   const documentLink= page.locator("[href*='documents-request']");
  55  | 
  56  | //Scenario is to select value from drop down which is static
  57  |  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
  58  |   const dropDown = page.locator("select.form-control");
  59  |   await dropDown.selectOption("Consultant");                              //selectOption("Given Value name") : It is uesed to select value from dropdown
  60  |  
  61  |  //Scenario is to click on another checkbox
  62  |    await page.locator(".customradio").last().click();
  63  |    await page.locator("#okayBtn").click();
  64  | 
  65  |  //Scenario is to see whether radio button is check or not by applying asseration
  66  |    
  67  |      await expect(page.locator(".customradio").last()).toBeChecked();                //toBeChecked(): It is an asseration to validated whether radiobutton is check or not
  68  |   //await page.pause();                                                      // page.pause: It is used to paused the windown or code
  69  | 
  70  |  //Scenario is we need to check and uncheck the checkbox and apply asseration
  71  | 
> 72  |   await page.locator("#terms").click();
      |                                ^ Error: locator.click: Test timeout of 30000ms exceeded.
  73  |   expect(page.locator("#terms")).toBeChecked();
  74  | 
  75  |   await page.locator("#terms").uncheck();
  76  |     expect(await page.locator("#terms").isChecked()).toBeFalsy();
  77  |     
  78  | 
  79  |  //Scenario : Verify if the link is blinking is not
  80  |  await expect(documentLink).toHaveAttribute("class","blinkingText");     //Asseration:toHaveAttribute("name","Value")
  81  | 
  82  | 
  83  | });
  84  | 
  85  | //Scenario: Handind Child window & Tab bu switching browser context
  86  | 
  87  | test('childWindow handling',async({browser})=>
  88  | {
  89  |     const context =await browser.newContext();
  90  |      const page= await context.newPage();
  91  |      const documentLink= page.locator("[href*='documents-request']");
  92  |      const username =page.locator("#username");
  93  | 
  94  |  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  95  | 
  96  |  const[newPage]= await Promise.all([                                    //Promise.all
  97  |  context.waitForEvent('page'),                                          //waitForEvent('page')
  98  |    documentLink.click(),]);
  99  | 
  100 |       const text=await newPage.locator(".im-para.red").textContent();
  101 |     
  102 |   console.log(text);
  103 | 
  104 |   //Scenario: To get domain name from returning text by using spilt function
  105 | 
  106 |      const arrayText=text.split("@");
  107 |      const domainName = arrayText[1].split(" ")[0];
  108 |      console.log(domainName);
  109 | 
  110 |      await page.bringToFront();                                           //bringToFront(): To bring parent page to front 
  111 | 
  112 |       await username.fill(domainName);
  113 | 
  114 | console.log(await username.inputValue());
  115 | 
  116 | 
  117 | 
  118 | 
  119 | 
  120 |  
  121 |      
  122 |      
  123 | 
  124 | 
  125 | 
  126 | 
  127 | });
```