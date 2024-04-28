import { expect, test, Page, chromium } from "@playwright/test";
import { da, fa, faker } from "@faker-js/faker";
import { HomePage } from "../../page-objects/HomePage";
import { RegisterPage } from "../../page-objects/RegisterPage";
import { LoginPage } from "../../page-objects/LoginPage";
import { CustomerInfoPage } from "../../page-objects/CustomerInfoPage";
import { updateCustomerInfo } from "../../data/updateCustomerInfo";
import { AddressPage } from "../../page-objects/AddressPage";
import { CommonFunction } from "../../utils/commonFunction.ts";
import data from "../../data/addNewAddress.json";

test.describe.configure({ mode: "serial" });
let page: Page;
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
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
});

test("T01 - Update Customer Info", async ({}) => {
  const customerInfoPage = new CustomerInfoPage(page);
  const homePage = new HomePage(page);
  await homePage.clickMyAccountLink();
  let updatedEmail = faker.internet.email();
  await customerInfoPage.updateCustomerInfo(
    updateCustomerInfo.firstName,
    updateCustomerInfo.lastName,
    (updateCustomerInfo.email = updatedEmail),
    updateCustomerInfo.companyName
  );
  expect(page.url()).toMatch(/.customer/);
  await customerInfoPage.verifyUpdateSuccessMessageDisplayed(
    "The customer info has been updated successfully."
  );
});

test("TC02 - Add New Address ", async ({}) => {
  const customerInfoPage = new CustomerInfoPage(page);
  const addressPage = new AddressPage(page);
  await customerInfoPage.clickAddressLink();
  await addressPage.verifyHeadingTitleDisplayed();
  await addressPage.clickAddressButton();
  await addressPage.addNewAddressInfo(
    data.firstName,
    data.lastName,
    data.email,
    data.company,
    data.country,
    data.state,
    data.city,
    data.address1,
    data.address2,
    data.zipCode,
    data.phoneNumber,
    data.faxNumber
  );
  await addressPage.verifySuccessMessage();
  const cityStateZip = `${data.city}, ${data.state}, ${data.zipCode}`;
  await addressPage.verifyInfoAfterAddNewAddress(
    data.email,
    data.phoneNumber,
    data.faxNumber,
    data.company,
    data.address1,
    data.address2,
    cityStateZip,
    data.country
  );
});

test.afterAll(async () => {
  await page.close();
});
