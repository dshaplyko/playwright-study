import { Locator, Page } from "@playwright/test";
import { Modal } from "../general/modals/modal.component";

export class TwoFactorModal extends Modal {
  readonly heading: Locator;

  readonly qrCode: Locator;

  readonly codeInput: Locator;

  readonly errorMessage: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.heading = this.el.locator("[data-test-id='key-add-heading']");
    this.qrCode = this.el.locator("[data-test-id='add-new-otp-qr-code']");
    this.codeInput = this.el.locator("#code");
    this.errorMessage = this.el.locator("[data-test-id='code-validation-error']");
  }
}
