import { Locator, Page } from "@playwright/test";
import { expectElementVisibility } from "../../../../utils";
import { FEATURES_OPTIONS } from "../../../../config";
import { Checkbox } from "../../basic/checkbox";
import { Main } from "./main.component";

export class Features extends Main {
  constructor(locator: Locator, page: Page) {
    super(locator, page);
  }

  getCheckbox(checkbox: FEATURES_OPTIONS): Checkbox {
    return new Checkbox(this.rootEl.locator(`label:has(> span:has-text('${checkbox}'))`));
  }

  async toggleFeatures(type: "general" | "premium", option: "check" | "uncheck"): Promise<void> {
    if (type === "general") {
      await this.getCheckbox(FEATURES_OPTIONS.ANNOUNCEMENTS)[option]();
      await this.getCheckbox(FEATURES_OPTIONS.API)[option]();
      await this.getCheckbox(FEATURES_OPTIONS.MARKET_INSIGHTS)[option]();
      await this.getCheckbox(FEATURES_OPTIONS.IN_THE_PRESS)[option]();
    } else {
      await this.getCheckbox(FEATURES_OPTIONS.BLOCKCHAIN_EXPLORER)[option]();
      await this.getCheckbox(FEATURES_OPTIONS.ORDER_BOOK)[option]();
      await this.getCheckbox(FEATURES_OPTIONS.TICKER)[option]();
      await this.getCheckbox(FEATURES_OPTIONS.TRADE)[option]();
    }
    await this.saveButton.click();
  }

  async toggleAllOptions(): Promise<void> {
    for (const item in FEATURES_OPTIONS) {
      if ({}.hasOwnProperty.call(item, FEATURES_OPTIONS)) {
        await this.getCheckbox(FEATURES_OPTIONS[item]).check();
      }
    }

    if (await this.saveButton.isEnabled()) {
      await this.saveButton.click();
      await this.page.locator("div.MuiSnackbarContent-message").waitFor();
    }
  }

  async checkCheckboxVisibility(): Promise<void> {
    await expectElementVisibility(this.getCheckbox(FEATURES_OPTIONS.ANNOUNCEMENTS).rootEl, true);
    await expectElementVisibility(this.getCheckbox(FEATURES_OPTIONS.API).rootEl, true);
    await expectElementVisibility(this.getCheckbox(FEATURES_OPTIONS.MARKET_INSIGHTS).rootEl, true);
    await expectElementVisibility(this.getCheckbox(FEATURES_OPTIONS.IN_THE_PRESS).rootEl, true);
    await expectElementVisibility(this.getCheckbox(FEATURES_OPTIONS.BLOCKCHAIN_EXPLORER).rootEl, true);
    await expectElementVisibility(this.getCheckbox(FEATURES_OPTIONS.BOOTLOADER_LOGO).rootEl, true);
    await expectElementVisibility(this.getCheckbox(FEATURES_OPTIONS.ORDER_BOOK).rootEl, true);
    await expectElementVisibility(this.getCheckbox(FEATURES_OPTIONS.TICKER).rootEl, true);
    await expectElementVisibility(this.getCheckbox(FEATURES_OPTIONS.TRADE).rootEl, true);
  }
}
