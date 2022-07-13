import { Locator } from "@playwright/test";
import { Form } from "./form.component";

export class Transfer extends Form {
  readonly walletAddressInput: Locator;

  readonly amountToBeSentInput: Locator;

  readonly equivalentAmountInput: Locator;

  readonly totalTransferOutFromWalletInput: Locator;

  readonly maximumButton: Locator;

  readonly paymentOutButton: Locator;

  readonly successMessage: Locator;

  readonly activityLink: Locator;

  readonly doneButton: Locator;

  readonly errorInvalidAddress: Locator;

  readonly errorInsufficientAmount: Locator;

  readonly currency: Locator;

  readonly bankMethod: Locator;

  readonly bankName: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.walletAddressInput = this.rootEl.locator("#funds-digital-payment-out-wallet-form-coin-address");
    this.amountToBeSentInput = this.rootEl.locator("#funds-digital-payment-out-wallet-form-amount-to-sent");
    this.equivalentAmountInput = this.rootEl.locator("#funds-digital-payment-out-wallet-form-equivalent-amount");
    this.totalTransferOutFromWalletInput = this.rootEl.locator("#funds-digital-payment-out-wallet-form-amount");
    this.maximumButton = this.rootEl.locator(
      "button[data-test-id='funds-digital-payment-out-wallet-form-maximum'], button[data-test-id='funds-payment-out-bank-transfer-form-max-button']"
    );
    this.paymentOutButton = this.rootEl.locator(
      "button[data-test-id='funds-digital-payment-out-wallet-form-payment-out'], button[data-test-id='funds-payment-out-bank-transfer-form-payment-out-button']"
    );
    this.successMessage = this.rootEl.locator("p");
    this.activityLink = this.successMessage.locator("a[href*='activity']");
    this.doneButton = this.rootEl.locator("button[data-test-id='results-done-button']");
    this.errorInvalidAddress = this.rootEl.locator(
      "[data-test-id='funds-digital-payment-out-wallet-form-general-submit-errors']"
    );
    this.errorInsufficientAmount = this.rootEl.locator(
      "[data-test-id='funds-payment-out-bank-transfer-form-field-amount-error']"
    );
    this.currency = this.rootEl.locator("span[data-test-id='funds-payment-out-bank-transfer-form-currency']");
    this.bankMethod = this.rootEl.locator("span[data-test-id='funds-payment-out-bank-transfer-form-bank-method']");
    this.bankName = this.rootEl.locator("span[data-test-id='funds-payment-out-bank-transfer-form-bank-name']");
  }
}
