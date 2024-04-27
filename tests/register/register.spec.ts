import { expect, test } from "@playwright/test";

import { HomePage } from "../../page-objects/HomePage";
import { RegisterPage } from "../../page-objects/RegisterPage";

test.describe("Register Function", () => {
  test.only("TC01 - Register with empty data", async ({ page }) => {
    await page.goto("/");

    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    await homePage.verifyImageDisplayed();
    await homePage.clickToRegisterLink();
    await expect(page).toHaveURL(/.register/)
    await registerPage.clickRegisterButton();
    await registerPage.verifyMessage();
    await page.pause();

  })
})
