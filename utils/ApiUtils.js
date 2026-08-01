class APIUtils {

    constructor(apiContext, longinPayload) {
        this.apiContext = apiContext;
        this.longinPayload = longinPayload;
    }

    async getToken() {
        const loginRespomse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data:this.longinPayload
            }
        )
        //await expect(loginRespomse.ok()).toBeTruthy();
        const loginResponseJson = await loginRespomse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;


    }


    async creatOrder(orderPayload) {
        let response = {};
        const token = await this.getToken();
        response.token = token;

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },

            })

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
          response.orderId=orderId;

        return response;



    }






}

module.exports = { APIUtils };

