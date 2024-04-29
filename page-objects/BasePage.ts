import { Locator, Page } from "@playwright/test";

export default class BasePage {
  public readonly page: Page;
  public readonly changePasswordLink: Locator;
  public readonly logOutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.changePasswordLink = page.getByRole("link", {
      name: "Change password",
    });
    this.logOutLink = page.getByRole('link', { name: 'Log out' });
  }

  async clickChangePasswordLink() {
    await this.changePasswordLink.click();
  }

  async clickLogoutLink() {
    await this.logOutLink.click();
  }
  //Common method to navigate to a URL
  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  //Common method to click an element
  async clickElement(element: Locator) {
    await element.click();
  }

  // Common method to fill out a form field
  async fillFormField(element: Locator, value: string) {
    await element.fill(value);
  }

  //Common method to retrieve text from an element
  async getElementText(element: Locator): Promise<string> {
    return element.innerText();
  }

  //Common method to wait for an element to be visible
  async waitForElementVisible(element: Locator | string) {
    if (typeof element === "string") {
      await this.page.waitForSelector(element, { state: "visible" });
    } else {
      await element.waitFor({ state: "visible" });
    }
  }

  // Common method to wait for an element to be hidden
  async waitForElementHidden(element: Locator) {
    if (typeof element === "string") {
      await this.page.waitForSelector(element, { state: "hidden" });
    } else {
      await element.waitFor({ state: "hidden" });
    }
  }

  //Common method to take screenshot
  async takeScreenshot(fileName: string) {
    await this.page.screenshot({ path: fileName });
  }
}
