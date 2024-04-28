import { Locator, Page, Expect, expect } from "@playwright/test";
import BasePage from "./BasePage";

export class HomePage extends BasePage {
  readonly page: Page;
  readonly expect: Expect;
  private readonly logoImage: Locator;
  private readonly registerLink: Locator;
  private readonly loginLink: Locator;
  private readonly myAccountLink: Locator;

  constructor(page: Page) {
    super(page);
    this.logoImage = page.locator("img[alt='nopCommerce demo store']");
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.loginLink = page.getByRole("link", { name: "Log in" });
    this.myAccountLink = page.locator(".ico-account");
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
}
