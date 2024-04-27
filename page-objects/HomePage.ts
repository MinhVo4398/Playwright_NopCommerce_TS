import { Locator, Page, Expect, expect } from "@playwright/test";
import BasePage from "./BasePage";

export class HomePage extends BasePage {
  readonly page: Page;
  readonly expect: Expect;
  private readonly logoImage: Locator;
  private readonly registerLink: Locator;

  constructor(page: Page) {
    super(page);
    // this.page = page;
    this.logoImage = page.locator("img[alt='nopCommerce demo store']");
    this.registerLink = page.getByRole('link', {name:'Register'})
  }

  async verifyImageDisplayed() {
    await expect(this.logoImage).toBeVisible();
  }

  async clickToRegisterLink() {
    await this.registerLink.click() 
 }
}
