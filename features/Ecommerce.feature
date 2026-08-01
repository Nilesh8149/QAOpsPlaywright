Feature: Login to Ecommerce Application
  @regression
  Scenario: Successful login with valid credential
    Given the user is on login page
    When the user enter the valid "nileshadole963@gmail.com" and "123@Nilesh" and click on login button
    Then user must redirect to Dashboard page



  @Validation
  Scenario Outline: Wrong ID and Password and get the error message printed in console
    Given a login to Ecommerance2 appilcation with "<username>" and "<password>"
    Then validate the error message

    Examples:

      | username                   | password    |
      | nileshadole963@gmail.com   | 123@Nilesh  |
      | pravinTokafe1233@gmail.com | 123!@Pravin |