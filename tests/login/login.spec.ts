import { expect, test } from "@playwright/test";
import { fa, faker } from "@faker-js/faker";
import { HomePage } from "../../page-objects/HomePage";
import { RegisterPage } from "../../page-objects/RegisterPage";

test.describe("Login Function", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto("/");
    await homePage.verifyImageDisplayed();
    await homePage.clickLoginLink();
  });
  test("TC01 - Login with empty data", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickLoginBtn();
    await homePage.verifyEnterEmailMessageDisplayed("Please enter your email");
  });

  test("TC02 - Login with invalid email", async ({ page }) => {
    const homePage = new HomePage(page);
    let invalidEmail = "minh1122";
    await homePage.inputEmailField(invalidEmail);
    await homePage.clickLoginBtn();
    await homePage.verifyEnterEmailMessageDisplayed("Wrong email");
  });

  test("TC03 - Login with email is not register", async ({ page }) => {
    const homePage = new HomePage(page);
    let email = "minh1122@gmail.com";
    let password = "123456";
    await homePage.inputEmailField(email);
    await homePage.inputPasswordField(password);
    await homePage.clickLoginBtn();
    await homePage.verifyErrorMessageDisplayed(
      "Login was unsuccessful. Please correct the errors and try again."
    );
  });

  test("TC04 - Login with email has register but not enter password", async ({
    page,
  }) => {
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);
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
    await homePage.inputEmailField(email);
    await homePage.inputPasswordField("");
    await homePage.clickLoginBtn();
    await homePage.verifyErrorMessageDisplayed(
      "Login was unsuccessful. Please correct the errors and try again.The credentials provided are incorrect"
    );
  });

  test("TC05 - Login with email has register but  enter wrong password", async ({
    page,
  }) => {
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);
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
    await homePage.inputEmailField(email);
    await homePage.inputPasswordField("1234");
    await homePage.clickLoginBtn();
    await homePage.verifyErrorMessageDisplayed(
      "Login was unsuccessful. Please correct the errors and try again.The credentials provided are incorrect"
    );
  });

  test("TC06 - Login with email has register and correct password", async ({
    page,
  }) => {
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);
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
    await homePage.inputEmailField(email);
    await homePage.inputPasswordField("1234");
    await homePage.clickLoginBtn();
    
  });
});
