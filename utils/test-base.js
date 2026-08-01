const base=require('@playwright/test');

exports.customtest=base.test.extend({

    testDataForOrder : 
    {
        username: "nileshadole963@gmail.com",
     password:"123@Nilesh",
     productName:"ZARA COAT 3"

    }


})
