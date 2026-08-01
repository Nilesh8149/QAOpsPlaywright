class DashboardPage{

    constructor(page)
    {
       this.product = page.locator(".card-body");
      this.productText= page.locator(".card-body b");
      this.cart=page.locator("[routerlink='/dashboard/cart']")
    }

    async searchProductAddToCart(productName)
    {
        console.log(await this.productText.allTextContents());

  const count = await this.product.count();

  for (let i = 0; i < count; ++i) {
    if (await this.product.nth(i).locator("b").textContent() === productName) {
      await this.product.nth(i).locator("text= Add To Cart").click();

      break;
    }
  };

  
    }

    async navigateToCart()
    {
        await this.cart.click();

    }

}

module.exports={DashboardPage}