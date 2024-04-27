import { Locator, Page, expect } from "@playwright/test";
import BasePage from "./BasePage";

export class RegisterPage extends BasePage {
  readonly page: Page;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly companyNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInout: Locator;
  private readonly registerButton: Locator;
  private readonly firstNameInlineErrorMessage: Locator;
  private readonly lastNameInlineErrorMessage: Locator;
  private readonly emailInlineErrorMessage: Locator;
  private readonly passwordInlineErrorMessage: Locator;
  private readonly confirmPasswordInlineErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator("#FirstName");
    this.lastNameInput = page.locator("#LastName");
    this.emailInput = page.locator("#Email");
    this.companyNameInput = page.locator("#Company");
    this.passwordInput = page.locator("#Password");
    this.confirmPasswordInout = page.locator("#ConfirmPassword");
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.firstNameInlineErrorMessage = page.locator("#FirstName-error");
    this.lastNameInlineErrorMessage = page.locator("#LastName-error");
    this.emailInlineErrorMessage = page.locator("#Email-error");
    this.passwordInlineErrorMessage = page.locator("#Password-error");
    this.confirmPasswordInlineErrorMessage = page.locator(
      "#ConfirmPassword-error"
    );
  }

  async clickRegisterButton() {
    this.clickElement(this.registerButton);
  }

  async verifyMessage() {
    expect(await this.firstNameInlineErrorMessage.textContent()).toContain(
      "First name is required."
    );
    expect(await this.lastNameInlineErrorMessage.textContent()).toContain(
      "Last name is required."
    );
    expect(await this.emailInlineErrorMessage.textContent()).toContain(
      "Email is required."
    );
    expect(await this.passwordInlineErrorMessage.textContent()).toContain(
      "Password is required."
    );
    expect(
      await this.confirmPasswordInlineErrorMessage.textContent()
    ).toContain("Password is required.");
  }
}
