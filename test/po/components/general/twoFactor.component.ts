/* eslint-disable require-await */
import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class TwoFactor extends Element {
  readonly inputs: Locator;

  readonly alternativeMethod: Locator;

  readonly confirmButton: Locator;

  readonly header: Locator;

  readonly codeInput: Locator;

  readonly errorMessage: Locator;

  readonly heading: Locator;

  readonly enableTwoFAButton: Locator;

  readonly cancelButton: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.inputs = this.rootEl.locator("input");
    this.alternativeMethod = this.rootEl.locator("button[data-test-id='two-factor-alternative-method-button']");
    this.confirmButton = this.rootEl.locator("button", { hasText: "Confirm" });
    this.header = this.rootEl.locator("[data-testid='two-factor-form-header']");
    this.codeInput = this.rootEl.locator("#code");
    this.errorMessage = this.rootEl.locator("[data-test-id='two-factor-form-error']");
    this.heading = this.rootEl.locator("[data-test-id='reminder-heading']");
    this.enableTwoFAButton = this.rootEl.locator("button", { hasText: "ENABLE 2FA" });
    this.cancelButton = this.rootEl.locator("button", { hasText: "Cancel" });
  }

  async fillOTPnumber(otp: string): Promise<void> {
    for (let i = 0; i <= 5; i++) {
      await this.rootEl.locator(`input[id='${i}']`).fill(otp[i]);
    }
  }
}
