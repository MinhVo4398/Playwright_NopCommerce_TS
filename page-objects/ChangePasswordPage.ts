import { Locator, Page, Expect, expect } from "@playwright/test";
import BasePage from "./BasePage";

export class ChangePasswordPage extends BasePage {
  readonly page: Page;
  readonly expect: Expect;
  readonly oldPasswordInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly changePasswordButton: Locator;
  readonly successMessage: Locator;
  readonly closeIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.oldPasswordInput = page.locator("#OldPassword");
    this.newPasswordInput = page.locator("#NewPassword");
    this.confirmPasswordInput = page.locator("#ConfirmNewPassword");
    this.changePasswordButton = page.getByRole("button", {
      name: "Change password",
    });
    this.successMessage = page.getByText('Password was changed');
    this.closeIcon = page.locator('.close');
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    await this.fillFormField(this.oldPasswordInput, oldPassword);
    await this.fillFormField(this.newPasswordInput, newPassword);
    await this.fillFormField(this.confirmPasswordInput, confirmPassword);
    await this.clickElement(this.changePasswordButton);
  }

  async verifySuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }

  async clickCloseIcon() {
    await this.clickElement(this.closeIcon);
  }

}
