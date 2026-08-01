const { DashboardPage } = require('./DashboardPage');
const { LoginPage } = require('./LoginPage');

class POManger
{
    constructor(page)
    {
         this.page=page;
         this.loginPage = new LoginPage(this.page);
         this.dashboard=new DashboardPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashBoardPage()
    {
        return this.dashboard;
    }
}

module.exports={POManger};
