import { Locator, Page, Expect, expect } from "@playwright/test";
import BasePage from "./BasePage";

export class HomePage extends BasePage {
  readonly page: Page;
  readonly expect: Expect;
  private readonly logoImage: Locator;
  private readonly registerLink: Locator;
  private readonly loginLink: Locator;
  private readonly myAccountLink: Locator;
  private readonly product:Locator;

  constructor(page: Page) {
    super(page);
    this.logoImage = page.locator("img[alt='nopCommerce demo store']");
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.loginLink = page.getByRole("link", { name: "Log in" });
    this.myAccountLink = page.locator(".ico-account");
    this.product = page.getByRole('link', { name: 'Build your own computer', exact: true });
  }

  async verifyImageDisplayed() {
    await expect(this.logoImage).toBeVisible();
  }

  async clickToRegisterLink() {
    await this.registerLink.click();
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }

  async clickMyAccountLink() {
    await this.myAccountLink.waitFor();
    await this.myAccountLink.click();
  }

  async clickToSpecificProduct(productName: string) {
    await this.page.getByRole("link", { name: productName, exact: true }).waitFor();
    await this.page.getByRole("link", { name: productName , exact: true}).click();
  }

  async clickProduct() {
    await this.product.click();
  }
}
