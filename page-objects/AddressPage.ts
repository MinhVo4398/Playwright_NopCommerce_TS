import { Locator, Page, Expect, expect } from "@playwright/test";
import BasePage from "./BasePage";

export class AddressPage extends BasePage {
  readonly page: Page;
  readonly expect: Expect;
  private readonly addNewAddressButton: Locator;
  private readonly headingTitle: Locator;
  private readonly saveButton: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly companyInput: Locator;
  private readonly countryDropdown: Locator;
  private readonly stateDropdown: Locator;
  private readonly cityInput: Locator;
  private readonly address1: Locator;
  private readonly address2: Locator;
  private readonly zipCode: Locator;
  private readonly phoneNumber: Locator;
  private readonly faxNumber: Locator;
  private readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.headingTitle = page.locator(
      "//h1[normalize-space()='My account - Addresses']"
    );
    this.addNewAddressButton = page.getByRole("button", { name: "Add new" });
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.firstNameInput = page.locator("#Address_FirstName");
    this.lastNameInput = page.locator("#Address_LastName");
    this.emailInput = page.locator("#Address_Email");
    this.companyInput = page.locator("#Address_Company");
    this.countryDropdown = page.locator("#Address_CountryId");
    this.stateDropdown = page.locator("#Address_StateProvinceId");
    this.cityInput = page.locator("#Address_City");
    this.address1 = page.locator("#Address_Address1");
    this.address2 = page.locator("#Address_Address2");
    this.zipCode = page.locator("#Address_ZipPostalCode");
    this.phoneNumber = page.locator("#Address_PhoneNumber");
    this.faxNumber = page.locator("#Address_FaxNumber");
    this.successMessage = page.locator(".content");
  }

  async verifyHeadingTitleDisplayed() {
    await expect(this.headingTitle).toBeVisible();
  }

  async clickAddressButton() {
    await this.addNewAddressButton.click();
  }

  async addNewAddressInfo(
    firstName: string,
    lastName: string,
    email: string,
    company: string,
    countryName: string,
    stateName: string,
    city: string,
    address1: string,
    address2: string,
    zipCode: string,
    phoneNumber: string,
    faxNumber: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    await this.emailInput.fill(email),
      await this.companyInput.fill(company),
      await this.countryDropdown.selectOption(countryName);
    await this.stateDropdown.selectOption(stateName);
    await this.cityInput.fill(city);
    await this.address1.fill(address1);
    await this.address2.fill(address2);
    await this.address2.fill(address2);
    await this.zipCode.fill(zipCode);
    await this.phoneNumber.fill(phoneNumber);
    await this.faxNumber.fill(faxNumber);
    await this.saveButton.click();
  }

  async verifySuccessMessage() {
    await this.successMessage.waitFor();
  }
}
