import { Locator, Page } from "@playwright/test";
import { COLUMN_NAMES } from "../../config/enums";
import { BasePage } from "./Base.page";

export class FeesPage extends BasePage {
  readonly url: string;

  readonly unverifiedRowPaymentOut: Locator;

  readonly verifiedRowPaymentOut: Locator;

  constructor(page: Page, url = "/pages/fees") {
    super(page);
    this.url = url;
    this.unverifiedRowPaymentOut = this.page.locator("div:has-text('Payment Out Fee') + div ~ span").first();
    this.verifiedRowPaymentOut = this.page.locator("div:has-text('Payment Out Fee') + div ~ span").nth(1);
  }

  async goto() {
    await super.goto(this.url);
  }

  getColumnByName(table: "Payment In Fee" | "Payment Out Fee", columnName: COLUMN_NAMES): Locator {
    return this.page
      .locator(`//div[contains(text(),'${table}')]/following::div/span[contains(text(), '${columnName}')]`)
      .first();
  }

  getRowByName(table: "Payment In Fee" | "Payment Out Fee", columnName: "Unverified" | "Verified"): Locator {
    switch (columnName) {
      case "Unverified":
        return this.page.locator(`div:has-text('${table}') + div ~ span`).first();
      case "Verified":
        return this.page.locator(`div:has-text('${table}') + div ~ span`).nth(1);
    }
  }
}
