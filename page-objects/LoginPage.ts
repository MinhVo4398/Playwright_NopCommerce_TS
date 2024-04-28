import { Locator, Page, Expect, expect } from "@playwright/test";
import BasePage from "./BasePage";

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly expect: Expect;
  private readonly logoImage: Locator;
  private readonly registerLink: Locator;
  private readonly loginLink: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginBtn: Locator;
  private readonly emailErrorMessage: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.logoImage = page.locator("img[alt='nopCommerce demo store']");
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.loginLink = page.getByRole("link", { name: "Log in" });
    this.emailInput = page.locator("#Email");
    this.passwordInput = page.locator("#Password");
    this.loginBtn = page.getByRole("button", { name: "Log in" });
    this.emailErrorMessage = page.locator("#Email-error");
    this.errorMessage = page.locator('.message-error');
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

  async inputEmailField(email: string) {
    await this.emailInput.fill(email);
  }

  async inputPasswordField(password: string) {
    await this.passwordInput.fill(password);
  }
  async clickLoginBtn() {
    await this.loginBtn.click();
  }

  async verifyEnterEmailMessageDisplayed(message: string) {
    expect(await this.emailErrorMessage.textContent()).toContain(message);
  }

  async verifyErrorMessageDisplayed(errorMessage:string) {
    expect(await this.errorMessage.textContent()).toContain(errorMessage);
  }
}
