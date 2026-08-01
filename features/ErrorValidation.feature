Feature: Ecommerce Validation

    @Validation
    Scenario Outline: Wrong ID and Password and get the error message printed in console
        Given a login to Ecommerance2 appilcation with "<username>" and "<password>"
        Then validate the error message

        Examples: 

            | username                   | password    |
            | nileshadole963@gmail.com   | 123@Nilesh  |
            | pravinTokafe1233@gmail.com | 123!@Pravin |