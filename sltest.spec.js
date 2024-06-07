const { test, expect } = require('@playwright/test')
import { LoginPage } from './LoginPage';
const loginPage = new LoginPage(page);

test('test01', async ({ page }) => {
    test.setTimeout(120000);

    //Login with non-valid cred. and confirm remaining on Login Page

    await loginPage.gotoLoginPage();
    await loginPage.login("keza", "3123123");
    await expect(page.url()).toHaveLength(26);
    const errTxt = "Epic sadface: Username and password do not match any user in this service";
    await expect(page.getByText(errTxt)).toBeVisible();
});


test.only('test02', async ({ page }) => {
    test.setTimeout(180000);

    //open and verify presence on Login Page

    await loginPage.gotoLoginPage();
    await expect(page).toHaveTitle("Swag Labs");
    await expect(page.locator("id=login-button")).toBeVisible();
    
    // Login with valid cred. and confirm presence on Home Page

    await loginPage.login("standard_user", "secret_sauce");
    await expect(page.url()).toContain("inventory");
    await expect(page.locator("id=react-burger-menu-btn")).toBeVisible();

    //Dropdown filter functionality

    const filterXp = "//select[@class='product_sort_container']";
    await page.locator(filterXp).selectOption({ index: 1 });
    
    //Selecting a product

    await page.getByText("Sauce Labs Backpack").click();
    const bcpkUrl = "https://www.saucedemo.com/inventory-item.html?id=4";
    const priceTx = await page.locator(".inventory_details_price").textContent();
    await expect(priceTx).toContain("29.99");
    await expect(page).toHaveURL(bcpkUrl);
    
    //Log out and verify presence on Login page

    await page.locator("id=react-burger-menu-btn").click();
    await page.getByText("Logout").click();
    await expect(page.locator("id=login-button")).toBeVisible();
});


