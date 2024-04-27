import { expect, test } from "@playwright/test";
import { fa, faker } from "@faker-js/faker";
import { HomePage } from "../../page-objects/HomePage";

test.describe('Login Function', () => {
  
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await page.goto("/");
        await homePage.verifyImageDisplayed();
        await homePage.clickLoginLink();
    })
    test("TC01 - Login with empty data", async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.clickLoginBtn();
        await homePage.verifyEnterEmailMessageDisplayed("Please enter your email");
      });
    

})
