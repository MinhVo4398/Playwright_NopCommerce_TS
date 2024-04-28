import { Locator, Page, Expect, expect } from "@playwright/test";
import BasePage from "./BasePage";

export class CustomerInfoPage extends BasePage {
  readonly page: Page;
  readonly expect: Expect;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly companyName: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator("#FirstName");
    this.lastName = page.locator("#LastName");
    this.email = page.locator("#Email");
    this.companyName = page.locator("#Company");
    this.saveButton = page.getByRole("button", { name: "Save" });
  }

  async updateCustomerInfo(
    firstName: string,
    lastName: string,
    email: string,
    companyName: string
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.companyName.fill(companyName);
    await this.saveButton.click();
  }
}
