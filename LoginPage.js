exports.LoginPage =
    class LoginPage {

        constructor(page) {

            this.page = page;
        }

        async gotoLoginPage() {

            await this.page.goto("https://www.saucedemo.com/");
        }

        async login(username, password) {

            await this.page.getByPlaceholder("Username").fill(username);
            await this.page.getByPlaceholder("Password").fill(password);
            await this.page.locator("id=login-button").click();
        }






    }