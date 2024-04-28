import { expect, test } from "@playwright/test";
import { fa, faker } from "@faker-js/faker";
import { HomePage } from "../../page-objects/HomePage";
import { RegisterPage } from "../../page-objects/RegisterPage";
import { LoginPage } from "../../page-objects/LoginPage";
import { CustomerInfoPage } from "../../page-objects/CusomerInfoPage";

test.describe("My Account Function", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    const homePage = new HomePage(page);

    await homePage.verifyImageDisplayed();
    await homePage.clickToRegisterLink();
    await expect(page).toHaveURL(/.register/);
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    // Pre-condition: Register email
    let firstName = faker.internet.userName();
    let lastName = faker.internet.displayName();
    let email = faker.internet.email();
    console.log(email);
    let companyName = "ABC Testing Company";
    let password = "123456789";
    await registerPage.inputInfoField(
      firstName,
      lastName,
      email,
      companyName,
      password,
      password
    );
    await registerPage.clickRegisterButton();
    await registerPage.verifyRegisterSuccessMessage(
      "Your registration completed"
    );

    homePage.clickLoginLink();
    await loginPage.inputEmailField(email);
    await loginPage.inputPasswordField(password);
    await loginPage.clickLoginBtn();
    await homePage.verifyImageDisplayed();
    await page.pause();
  });

  test("T01 - Update Customer Info", async ({ page }) => {
    const customerInfoPage = new CustomerInfoPage(page);
    const homePage = new HomePage(page);
    await homePage.clickMyAccountLink();
    await customerInfoPage.updateCustomerInfo(
      "Minh1",
      "Test",
      "minh123@gmail.com",
      "ABC Company"
    );
    expect(await page.url()).toMatch(/.customer/);
  });
});
