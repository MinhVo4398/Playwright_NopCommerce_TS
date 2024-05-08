import { Locator, Page, Expect, expect } from "@playwright/test";
import BasePage from "./BasePage";
import { CommonFunction } from "../utils/commonFunction.ts";

export class ProductPage extends BasePage {
  readonly page: Page;
  readonly expect: Expect;
  private readonly addYourReviewsLink: Locator;
  private readonly reviewTitleInput: Locator;
  private readonly reviewTextInput: Locator;
  private readonly submitReviewButton: Locator;
  private readonly productReviewSuccessMessage: Locator;
  private readonly reviewTitle: Locator;
  private readonly reviewText: Locator;

  constructor(page: Page) {
    super(page);
    this.addYourReviewsLink = page.getByRole("link", {
      name: "Add your review",
    });
    this.reviewTitleInput = page.getByLabel("Review title:");
    this.reviewTextInput = page.getByLabel("Review text:");
    this.submitReviewButton = page.getByRole("button", {
      name: "Submit review",
    });
    this.productReviewSuccessMessage = page.getByText(
      "Product review is successfully added."
    );
    this.reviewTitle = page.locator(".review-title");
    this.reviewText = page.locator(".review-text");
  }

  async addReviews(reviewTitle: string, reviewText: string) {
    await this.addYourReviewsLink.click();

    await this.reviewTitleInput.fill(reviewTitle);
    await this.reviewTextInput.fill(reviewText);
    await this.submitReviewButton.click();
  }

  async verifySuccessMessage() {
    expect(this.productReviewSuccessMessage).toBeVisible();
  }

  async verifyTitleAndReviewText(reviewTitle: string, reviewText: string) {
    expect(await this.reviewTitle.first().textContent()).toContain(
      reviewTitle.trim()
    );
    expect(await this.reviewText.first().textContent()).toContain(
      reviewText.trim()
    );
  }
}
