import { expect, test } from "@playwright/test";
import { fa, faker } from "@faker-js/faker";
import { HomePage } from "../../page-objects/HomePage";
import { RegisterPage } from "../../page-objects/RegisterPage";
import { LoginPage } from "../../page-objects/LoginPage";

test.describe("Login Function", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto("/");
    await homePage.verifyImageDisplayed();
    await homePage.clickLoginLink();
  });
  test("TC01 - Login with empty data", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginBtn();
    await loginPage.verifyEnterEmailMessageDisplayed("Please enter your email");
  });

  test("TC02 - Login with invalid email", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    let invalidEmail = "minh1122";
    await loginPage.inputEmailField(invalidEmail);
    await loginPage.clickLoginBtn();
    await loginPage.verifyEnterEmailMessageDisplayed("Wrong email");
  });

  test("TC03 - Login with email is not register", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    let email = "minh1122@gmail.com";
    let password = "123456";
    await loginPage.inputEmailField(email);
    await loginPage.inputPasswordField(password);
    await loginPage.clickLoginBtn();
    await loginPage.verifyErrorMessageDisplayed(
      "Login was unsuccessful. Please correct the errors and try again."
    );
  });

  test("TC04 - Login with email has register but not enter password", async ({
    page,
  }) => {
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Pre-condition: Register email
    homePage.clickToRegisterLink();
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
    await loginPage.inputPasswordField("");
    await loginPage.clickLoginBtn();
    await loginPage.verifyErrorMessageDisplayed(
      "Login was unsuccessful. Please correct the errors and try again.The credentials provided are incorrect"
    );
  });

  test("TC05 - Login with email has register but  enter wrong password", async ({
    page,
  }) => {
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    // Pre-condition: Register email
    homePage.clickToRegisterLink();
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
    await loginPage.inputPasswordField("1234");
    await loginPage.clickLoginBtn();
    await loginPage.verifyErrorMessageDisplayed(
      "Login was unsuccessful. Please correct the errors and try again.The credentials provided are incorrect"
    );
  });

  test("TC06 - Login with email has register and correct password", async ({
    page,
  }) => {
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    // Pre-condition: Register email
    homePage.clickToRegisterLink();
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
  });
});
