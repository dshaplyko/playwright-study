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
    this.inputs = this.el.locator("input");
    this.alternativeMethod = this.el.locator("[data-test-id='two-factor-alternative-method-button']");
    this.confirmButton = this.el.locator("button", { hasText: "Confirm" });
    this.header = this.el.locator("[data-testid='two-factor-form-header']");
    this.codeInput = this.el.locator("#code");
    this.errorMessage = this.el.locator("[data-test-id='two-factor-form-error-text']");
    this.heading = this.el.locator("[data-test-id='reminder-heading']");
    this.enableTwoFAButton = this.el.locator("button", { hasText: "ENABLE 2FA" });
    this.cancelButton = this.el.locator("button", { hasText: "Cancel" });
  }

  async fillOTPnumber(otp: string): Promise<void> {
    for (let i = 0; i <= 5; i++) {
      await this.el.locator(`input[id='${i}']`).fill(otp[i]);
    }
  }
}
