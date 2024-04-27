import { expect, test } from "@playwright/test";
import { fa, faker } from "@faker-js/faker";
import { HomePage } from "../../page-objects/HomePage";
import { RegisterPage } from "../../page-objects/RegisterPage";

test.describe("Register Function", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    const homePage = new HomePage(page);

    await homePage.verifyImageDisplayed();
    await homePage.clickToRegisterLink();
    await expect(page).toHaveURL(/.register/);
  });

  test("TC01 - Register with empty data", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.clickRegisterButton();
    await registerPage.verifyMessage();
  });

  test("TC02 - Register with valid email ", async ({ page }) => {
    let invalidEmail = "minh1234@@";
    const registerPage = new RegisterPage(page);
    await registerPage.inputEmailField(invalidEmail);
    await registerPage.clickRegisterButton();
    await registerPage.verifyWrongEmailMessage("Wrong email");
  });

  test("TC03 - Register with vadlid info", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    let firstName = faker.internet.userName();
    let lastName = faker.internet.displayName();
    let email = faker.internet.email();
    console.log(email);
    let companyName = 'ABC Testing Company';
    let password = '123456789'
    await registerPage.inputValidIfo(firstName, lastName, email,companyName, password, password);
    await registerPage.clickRegisterButton();
    await registerPage.verifyRegisterSuccessMessage('Your registration completed');
  });
});
