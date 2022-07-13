import { Locator, Page } from "@playwright/test";
import { Element } from "../../basic/element";

export class Modal extends Element {
  readonly page: Page;

  readonly title: Locator;

  readonly buttonConfirm: Locator;

  readonly buttonCancel: Locator;

  readonly buttonReset: Locator;

  readonly body: Locator;

  readonly list: Locator;

  readonly additionalCryptoLabel: Locator;

  readonly buttonClose: Locator;

  readonly okButton: Locator;

  readonly verifyButton: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.title = this.rootEl.locator(
      "[data-test-id='dialogue-title'], [data-test-id$='dialog-title'], [data-test-id='modal-historical-reports-form-title'], [data-test-id='two-factor-mandatory-explanation'], header"
    );
    this.buttonConfirm = this.rootEl.locator("button", { hasText: "Confirm" });
    this.buttonCancel = this.rootEl.locator("button", { hasText: "Cancel" });
    this.buttonReset = this.rootEl.locator("button", { hasText: "Reset" });
    this.body = this.rootEl
      .locator(
        "[data-test-id='dialogue-body'], p.MuiDialogContentText-root>span, p.MuiTypography-BODY_TEXT_DEFAULT, span.MuiTypography-SMALL_SUBTEXT, [data-test-id='settings-modal'], .MuiDialogContent-root"
      )
      .nth(0);
    this.list = this.rootEl.locator("p>ul");
    this.additionalCryptoLabel = this.rootEl.locator("[data-test-id='dialog-additional-crypto-label']");
    this.buttonClose = this.rootEl.locator(
      "button[data-test-id='dialogue-close'], header button>svg[data-testid='CloseIcon']"
    );
    this.okButton = this.rootEl.locator("button", { hasText: "OK" });
    this.verifyButton = this.rootEl.locator("a", { hasText: "VERIFY" });
  }
}
