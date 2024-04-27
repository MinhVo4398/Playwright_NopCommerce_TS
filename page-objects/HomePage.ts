import { Locator, Page, Expect, expect } from "@playwright/test";
import BasePage from "./BasePage";

export class HomePage extends BasePage {
  readonly page: Page;
  readonly expect: Expect;
  private readonly logoImage: Locator;
  private readonly registerLink: Locator;
  private readonly loginLink: Locator;
  private readonly emailInput: Locator;
  private readonly loginBtn: Locator;
  private readonly emailErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    // this.page = page;
    this.logoImage = page.locator("img[alt='nopCommerce demo store']");
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.loginLink = page.getByRole("link", { name: "Log in" });
    this.emailInput = page.locator('#Email')
    this.loginBtn = page.getByRole('button', {name:'Log in'})
    this.emailErrorMessage  = page.locator('#Email-error')
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

  async inputEmailField(email:string) {
    await this.emailInput.fill(email);
  }

 async clickLoginBtn() {
  await this.loginBtn.click();
 }

 async verifyEnterEmailMessageDisplayed(message: string) {
expect(await this.emailErrorMessage.textContent()).toContain(message);
 }
}
