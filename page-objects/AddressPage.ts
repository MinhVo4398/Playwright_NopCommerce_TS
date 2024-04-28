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
  private readonly emailAddress: Locator;
  private readonly phoneNumberAddress: Locator;
  private readonly faxNumberAddress: Locator;
  private readonly companyAddress: Locator;
  private readonly address1Address: Locator;
  private readonly address2Address: Locator;
  private readonly cityStateZipAddress: Locator;
  private readonly countryAddress: Locator;

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
    this.emailAddress = page.locator(".email");
    this.phoneNumberAddress = page.locator(".phone");
    this.faxNumberAddress = page.locator(".fax");
    this.companyAddress = page.locator(".company");
    this.address1Address = page.locator(".address1");
    this.address2Address = page.locator(".address2");
    this.cityStateZipAddress = page.locator(".city-state-zip");
    this.countryAddress = page.locator(".country");
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
    await this.clickElement(this.saveButton);
  }

  async verifySuccessMessage() {
    await this.successMessage.waitFor();
  }

  async verifyInfoAfterAddNewAddress(
    email: string,
    phoneNumber: string,
    taxNumber: string,
    company: string,
    address1: string,
    address2: string,
    cityStateZipAddress: string,
    country:string
  ) {
    expect(await this.emailAddress.textContent()).toContain(email);
    expect(await this.phoneNumberAddress.textContent()).toContain(phoneNumber);
    expect(await this.faxNumberAddress.textContent()).toContain(taxNumber);
    expect(await this.companyAddress.textContent()).toContain(company);
    expect(await this.address1Address.textContent()).toContain(address1);
    expect(await this.address2Address.textContent()).toContain(address2);
    expect(await this.cityStateZipAddress.textContent()).toContain(cityStateZipAddress);
    expect(await this.countryAddress.textContent()).toContain(country);
  }
}
